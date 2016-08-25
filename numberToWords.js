///////////////////////////////////////////////////////////////////////////////
// function to convert a number to english words
///////////////////////////////////////////////////////////////////////////////
function numberToWords(n) {
    if (n == 0) {
        return 'zero';
    }

    var a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var b = ['', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    var g = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'];

    var grp = function grp(n) {
        return ('000' + n).substr(-3);
    };

    var rem = function rem(n) {
        return n.substr(0, n.length - 3);
    };

    var fmt = function fmt(_ref) {
        var h = _ref[0];
        var t = _ref[1];
        var o = _ref[2];

        return [Number(h) === 0 ? '' : a[h] + ' hundred ', Number(o) === 0 ? b[t] : b[t] && b[t] + '-' || '', a[t + o] || a[o]].join('');
    };

    var cons = function cons(xs) {
        return function (x) {
            return function (g) {
                return x ? [x, g && ' ' + g || '', ' ', xs].join('') : xs;
            };
        };
    };

    var iter = function iter(str) {
        return function (i) {
            return function (x) {
                return function (r) {
                    if (x === '000' && r.length === 0) {
                        return str;
                    }
                    return iter(cons(str)(fmt(x))(g[i]))(i + 1)(grp(r))(rem(r));
                };
            };
        };
    };
    return iter('')(0)(grp(String(n)))(rem(String(n)));
}

///////////////////////////////////////////////////////////////////////////////
// function to convert a currency number value to portuguese words
///////////////////////////////////////////////////////////////////////////////
function numeroPorExtenso(c) {
  var ex = [
        ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
        ["dez", "vinte", "trinta", "quarenta", "cinqüenta", "sessenta", "setenta", "oitenta", "noventa"],
        ["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
        ["mil", "milhão", "bilhão", "trilhão", "quadrilhão", "quintilhão", "sextilhão", "setilhão", "octilhão", "nonilhão", "decilhão", "undecilhão", "dodecilhão", "tredecilhão", "quatrodecilhão", "quindecilhão", "sedecilhão", "septendecilhão", "octencilhão", "nonencilhão"]
    ];

    var a, n, v, i, n = c.replace(c ? /[^,\d]/g : /\D/g, "").split(","), e = " e ", $ = "real", d = "centavo", sl;

    for (var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []) {
        j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));

        if (!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) {
          continue;
        }

        for (a = -1, l = v.length; ++a < l; t = "") {
            if (!(i = v[a] * 1)) {
              continue;
            }
            i % 100 < 20 && (t += ex[0][i % 100]) ||
            i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
            s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
            ((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t]) : ""));
        }
        a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
        a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
    }
    return r.join(e);
}