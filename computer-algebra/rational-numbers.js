var rational = {};

rational.reduce = function(a)
{
    var res = a.createCopy();

    var gcf = natural.gcf(a.numerator, a.denominator);
    res.numerator = natural.div(res.numerator, gcf);
    res.denominator = natural.div(res.denominator, gcf);

    return res;
}

rational.isInteger = function(a)
{
    if(natural.compare(a.numerator, a.denominator) == 1) return false;
    else
    {
        return natural.isZero(natural.mod(a.numerator, a.denominator));
    }
}

rational.plus = function(a, b)
{
    var res = new fraction(null);
    
    var lcm = natural.lcm(a.denominator, b.denominator);
    var n1 = natural.multiply(a.numerator, natural.div(lcm, a.denominator));
    var n2 = natural.multiply(b.numerator, natural.div(lcm, b.denominator));
    n1.positive = a.positive;
    n2.positive = b.positive;
    console.log(n1.toString() + " " + n2.toString());
    var n = integer.plus(n1, n2);

    res.positive = n.positive;
    n.positive = true;
    res.numerator = n;
    res.denominator = lcm;

    res = rational.reduce(res);
    return res;
}

rational.minus = function(a, b)
{
    n = b.createCopy();
    n.positive = !n.positive;
    console.log(a.toString() + " " + n.toString());
    var res = rational.plus(a, n);
    res = rational.reduce(res);

    return res;
}

rational.multiply = function(a, b)
{
    var res = new fraction(null);

    res.numerator = natural.multiply(a.numerator, b.numerator);
    res.denominator = natural.multiply(a.denominator, b.denominator);
    res.positive = a.positive == b.positive;
    res = rational.reduce(res);
    return res;
}

rational.div = function(a, b)
{
    var res = new fraction(null);

    res.numerator = natural.multiply(a.numerator, b.denominator);
    res.denominator = natural.multiply(a.denominator, b.numerator);
    res.positive = a.positive == b.positive;
    res = rational.reduce(res);
    return res;
}