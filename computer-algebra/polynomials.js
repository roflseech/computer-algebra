/*
Некрасов Никита
Группа 7305
Функции для работы с многочленами
*/

//Объект, содержащий функции для работы с многочленами
var polynomials = {};

polynomials.plus = function(a, b)
{
    var res = a.createCopy();

    for(var i = b.greatDegree(); i != null; i = i.next)
    {
        res.addCoef(i.degree, i.coef);
    }
    return res;
}
polynomials.minus = function(a, b)
{
    var res = a.createCopy();

    for(var i = b.greatDegree(); i != null; i = i.next)
    {
        var c = i.coef.createCopy();
        c.positive = !c.positive;
        res.addCoef(i.degree, c);
    }
    return res;
}
polynomials.multByRational = function(a, b)
{
    var res = new polynomial(null);

    for(var i = a.greatDegree(); i != null; i = i.next)
    {
        var tmp = rational.multiply(b, i.coef);
        tmp = rational.reduce(tmp);
        res.setCoef(i.degree, tmp);
    }
    return res;
}
polynomials.multByXpowerk = function(a, k)
{
    var res = a.createCopy();

    for(var i = res.greatDegree(); i != null; i = i.next)
    {
        i.degree = natural.plus(i.degree, k);
    }
    return res;
}
polynomials.greatDegree = function(a)
{
    return a.greatDegree().degree.createCopy();
}
polynomials.toIntegerCoefficient = function(a)
{
    var res = a.createCopy();

    var cur = res.greatDegree();
    var gcf = cur.coef.numerator.createCopy();
    var lcm = cur.coef.denominator.createCopy();
    cur = cur.next;
    while(cur != null)
    {
        gcf = natural.gcf(gcf, cur.coef.numerator);
        lcm = natural.lcm(lcm, cur.coef.denominator);
        cur = cur.next;
    }
    var m = new fraction(null);
    m.numerator = lcm;
    m.denominator = gcf;
    res = polynomials.multByRational(res, m);

    var resObject = {};
    resObject.multiplier = m;
    resObject.res = res;

    return resObject;
}
polynomials.multiply = function(a, b)
{
    var res = new polynomial(null);

    for(var i = b.greatDegree(); i != null; i = i.next)
    {
        var mult = polynomials.multByRational(a, i.coef);
        mult = polynomials.multByXpowerk(mult, i.degree);

        res = polynomials.plus(res, mult);
    }
    return res;
}
polynomials.div = function(a, b)
{
    var res = new polynomial(null);
    var ost = a.createCopy();

    while(ost.greatDegree() != null && natural.compare(ost.greatDegree().degree, b.greatDegree().degree) != 1)
    {
        var mult = rational.div(ost.greatDegree().coef, b.greatDegree().coef);
        var powx = natural.minus(ost.greatDegree().degree, b.greatDegree().degree);
        ost = polynomials.minus(ost, polynomials.multByXpowerk(polynomials.multByRational(b, mult), powx));
        res.setCoef(powx, mult);
    }
    return res;
}
polynomials.mod = function(a, b)
{
    var m = polynomials.minus(a, polynomials.multiply(polynomials.div(a, b), b));
    return m;
}
polynomials.gcf = function(a, b)
{
    var greater;
    var lesser;
    if(natural.compare(a.greatDegree().degree, b.greatDegree().degree) == 2)
    {
        greater = a.createCopy();
        lesser = b.createCopy();
    }
    else
    {
        greater = a.createCopy();
        lesser = b.createCopy();
    }

    while(lesser.greatDegree() != null && natural.compare(lesser.greatDegree().degree, greater.greatDegree().degree) != 2)
    {
        var tmp = lesser;
        lesser = polynomials.mod(greater, lesser)
        greater = tmp;
    }
    return greater;
}
polynomials.derivative = function(a)
{
    var one = new longNumber("1");
    var res = new polynomial(null);
    for(var i = a.greatDegree(); i != null && !natural.isZero(i.degree); i = i.next)
    {
        var coef = i.coef.createCopy();
        coef.numerator = natural.multiply(coef.numerator, i.degree);
        coef = rational.reduce(coef);

        res.setCoef(natural.minus(i.degree, one), coef);
    }
    return res;
}
polynomials.calculate = function(a, p)
{
    var res = new fraction("");
    for(var i = a.greatDegree(); i != null; i = i.next)
    {
        res = rational.plus(res, rational.multiply(i.coef, rational.power(p, i.degree)));
    }
    return res;
}
polynomials.power = function(a, p)
{
    var res = a.createCopy();
    for(var i = new longNumber("1"); natural.compare(i, p) == 1; i = natural.addOne(i))
    {
        res = polynomials.multiply(res, a);
    }
    return res;
}
polynomials.roots = function(a)
{
    //p/q возможный корень
    var res = new Array();

    var ost = polynomials.toIntegerCoefficient(a.createCopy()).res;
    var qArray = natural.allDivs(ost.greatDegree().coef.numerator);

    var j = ost.greatDegree(); while(j.next != null) j = j.next;
    var pArray = natural.allDivs(j.coef.numerator);
    if(natural.isZero(polynomials.calculate(ost, new fraction("0")).numerator))
        res.push(new fraction("0"));

    for(var p = 0; p < pArray.length; p++)
    {
        for(var q = 0; q < qArray.length; q++)
        {
            var tmp = new fraction("");
            tmp.numerator = pArray[p];
            tmp.denominator = qArray[q];
            if(natural.isZero(polynomials.calculate(ost, tmp).numerator)) res.push(tmp);
            else
            {
                tmp.positive = false;
                if(natural.isZero(polynomials.calculate(ost, tmp).numerator)) res.push(tmp);
            }
        }
    }
    return res;
}
polynomials.toSingleRoots = function(a)
{
    var res = a.createCopy();
    var roots = polynomials.roots(a);
    for(var i = 0; i < roots.length; i++)
    {
        var  d = roots[i];
        d.positive = !d.positive;
        var div = new polynomial("x" +(d.positive ? "+" : "") + d.toString());
        while(polynomials.mod(res, polynomials.multiply(div, div)).greatDegree() == null) res = polynomials.div(res, div);
    }
    return res;
}