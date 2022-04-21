

var isNatural = function(str, start, end)
{
    if(str.length == 0) return false;
    if(start === undefined) start = 0;
    if(end === undefined) end = str.length - 1;

    for(var i = start; i < str.length && i <= end; i++)
        if('0123456789'.indexOf(str.charAt(i)) == -1) return false;
    
    return true;
}
var isInteger = function(str, start, end)
{
    if(str.length == 0) return false;
    if(start === undefined) start = 0;
    if(end === undefined) end = str.length - 1;
    if(str.charAt(start) == '-') start = start + 1;
    for(var i = start; i < str.length && i <= end; i++)
        if('0123456789'.indexOf(str.charAt(i)) == -1) return false;

    return true;
}
var isRational = function(str)
{
    if(isInteger(str)) return true;
    if(str.charAt(0) == "-") str = str.replace("-", "");
    str = str.split("/");

    return str.length == 2 && isNatural(str[0]) && isNatural(str[1]) && !natural.isZero(new longNumber(str[1]));
}
var isPolynomialAdd = function(str)
{
    str = str.split("x");
    if(str.length == 1) 
        return isRational(str[0]);
    if(str.length == 2)
        return ((str[0] == "" || isRational(str[0])) && (str[1] == "" || isNatural(str[1]))) ;
    return false;
}
var isPolynomial = function(str)
{
    str = str.split("^").join("");
    str = str.split("-").join("+");
    str = str.split("+");
    for(var i = 0; i > str.length; i++)
    {
        if(!isPolynomialAdd(str[i])) return false;
    }
    return true;
}
var runCommand = function(cmdname, args)
{
    if(cmdname.indexOf("natural") == 0)
    {
        cmdname = cmdname.replace("natural-", "");
        return parseNaturalCommand(cmdname, args);
    }
    else if(cmdname.indexOf("integer") == 0)
    {
        cmdname = cmdname.replace("integer-", "");
        return parseIntegerCommand(cmdname, args);
    }
    else if(cmdname.indexOf("rational") == 0)
    {
        cmdname = cmdname.replace("rational-", "");
        return parseRationalCommand(cmdname, args);
    }
    else if(cmdname.indexOf("polynomial") == 0)
    {
        cmdname = cmdname.replace("polynomial-", "");
        return parsePolynomialCommand(cmdname, args);
    }
}
var parseNaturalCommand = function(cmdname, args)
{
    argsArray = args.replace(/ /g,"").split(",");
    
    if(cmdname == "compare")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isNatural(argsArray[0])) return "One of arguments is not a natural [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "One of arguments is not a natural [" + argsArray[1] + "]";
        var res = natural.compare(new longNumber(argsArray[0]), new longNumber(argsArray[1]));
        if(res == 2) return "" + argsArray[0] + " > " + argsArray[1];
        else if(res == 1) return "" + argsArray[0] + " < " + argsArray[1];
        else return "Numbers equal";
    }
    else if(cmdname == "iszero")
    {
        if(argsArray.length != 1) return "1 argument required";
        if(!analyzer.isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        return !natural.isZero(new longNumber(argsArray[0]));
    }
    else if(cmdname == "addone")
    {
        if(argsArray.length != 1) return "1 argument required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        return natural.addOne(new longNumber(argsArray[0])).toString();
    }
    else if(cmdname == "plus")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Not a natural [" + argsArray[1] + "]";
        return natural.plus(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "minus")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Not a natural [" + argsArray[1] + "]";
        if(natural.compare(new longNumber(argsArray[0]), new longNumber(argsArray[1])) == 1) return "Первое число меньше второго";
        return natural.minus(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "multbydigit")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Not a natural [" + argsArray[1] + "]";
        if(argsArray[1].length != 1) return "Второй аргумент должен быть одной цифрой";
        return natural.multByDigit(new longNumber(argsArray[0]), parseInt(argsArray[1])).toString();
    }
    else if(cmdname == "multby10powerk")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Not a natural [" + argsArray[1] + "]";
        return natural.multBy10PowerK(new longNumber(argsArray[0]), parseInt(argsArray[1])).toString();
    }
    else if(cmdname == "multiply")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Not a natural [" + argsArray[1] + "]";
        return natural.multiply(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "minusmultiplied")
    {
        if(argsArray.length != 3) return "3 arguments required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Not a natural [" + argsArray[1] + "]";
        if(!isNatural(argsArray[2])) return "Not a natural [" + argsArray[2] + "]";
        if(argsArray[2].length != 1) return "Третий аргумент должен быть одной цифрой";
        return natural.minusMultiplied(new longNumber(argsArray[0]), new longNumber(argsArray[1]), parseInt(argsArray[2])).toString();
    }
    else if(cmdname == "firstdigitbydiv")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Not a natural [" + argsArray[1] + "]";
        if(new longNumber(argsArray[1]).greatDigit() == -1) return "Делитель должен быть отличен от 0";
        return "" + natural.firstDigitByDiv(new longNumber(argsArray[0]), new longNumber(argsArray[1]));
    }
    else if(cmdname == "div")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Not a natural [" + argsArray[1] + "]";
        if(new longNumber(argsArray[1]).greatDigit() == -1) return "Делитель должен быть отличен от 0";
        return natural.div(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "mod")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Not a natural [" + argsArray[1] + "]";
        if(new longNumber(argsArray[1]).greatDigit() == -1) return "Делитель должен быть отличен от 0";
        return natural.mod(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "gcf")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Not a natural [" + argsArray[1] + "]";
        return natural.gcf(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "lcm")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Not a natural [" + argsArray[1] + "]";
        return natural.lcm(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "power")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Not a natural [" + argsArray[1] + "]";
        return natural.power(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "factorize")
    {
        if(argsArray.length != 1) return "1 argument required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        var res = natural.factorize(new longNumber(argsArray[0]));
        var str = "";
        for(var i = 0; i < res.length; i++)
        {
            str += res[i];
            if(i != res.length - 1) str += " * ";
        }
        return str;
    }
    else if(cmdname == "alldivs")
    {
        if(argsArray.length != 1) return "1 argument required";
        if(!isNatural(argsArray[0])) return "Not a natural [" + argsArray[0] + "]";
        var res = natural.allDivs(new longNumber(argsArray[0]));
        var str = "";
        for(var i = 0; i < res.length; i++)
        {
            str += res[i];
            if(i != res.length - 1) str += ",";
        }
        return str;
    }
    return "Команда не распознана";
}
//Выполнение команды для целых чисел и анализ ввода
var parseIntegerCommand = function(cmdname, args)
{
    argsArray = args.replace(/ /g,"").split(",");
    
    if(cmdname == "abs")
    {
        if(argsArray.length != 1) return "1 argument required";
        if(!isInteger(argsArray[0])) return "Not an integer [" + argsArray[0] + "]";
        return integer.abs(new longNumber(argsArray[0]));
    }
    else if(cmdname == "ispositive")
    {
        if(argsArray.length != 1) return "1 argument required";
        if(!isInteger(argsArray[0])) return "Not an integer [" + argsArray[0] + "]";
        return integer.isPositive(new longNumber(argsArray[0]));
    }
    else if(cmdname == "multbyminusone")
    {
        if(argsArray.length != 1) return "1 argument required";
        if(!isInteger(argsArray[0])) return "Not an integer [" + argsArray[0] + "]";
        return integer.multbyminusone(new longNumber(argsArray[0]));
    }
    else if(cmdname == "plus")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isInteger(argsArray[0])) return "Not an integer [" + argsArray[0] + "]";
        if(!isInteger(argsArray[1])) return "Not an integer [" + argsArray[1] + "]";
        return integer.plus(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "minus")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isInteger(argsArray[0])) return "Not an integer [" + argsArray[0] + "]";
        if(!isInteger(argsArray[1])) return "Not an integer [" + argsArray[1] + "]";
        return integer.minus(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "multiply")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isInteger(argsArray[0])) return "Not an integer [" + argsArray[0] + "]";
        if(!isInteger(argsArray[1])) return "Not an integer [" + argsArray[1] + "]";
        return integer.multiply(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "div")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isInteger(argsArray[0])) return "Not an integer [" + argsArray[0] + "]";
        if(!isInteger(argsArray[1])) return "Not an integer [" + argsArray[1] + "]";
        if(natural.isZero(new longNumber(argsArray[1]))) return "Divisor cannot be a 0";
        return integer.div(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "mod")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isInteger(argsArray[0])) return "Not an integer [" + argsArray[0] + "]";
        if(!isInteger(argsArray[1])) return "Not an integer [" + argsArray[1] + "]";
        if(natural.isZero(new longNumber(argsArray[1]))) return "Divisor cannot be a 0";
        return integer.mod(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "power")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isInteger(argsArray[0])) return "Not an integer [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Not a natural [" + argsArray[1] + "]";
        return integer.power(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    return "Команда не распознана";
}
//Выполнение команды для рациональных числе и анализ ввода
var parseRationalCommand = function(cmdname, args)
{
    argsArray = args.replace(/ /g,"").split(",");
    
    if(cmdname == "reduce")
    {
        if(argsArray.length != 1) return "1 argument required";
        if(!isRational(argsArray[0])) return "Not a rational [" + argsArray[0] + "]";
        return rational.reduce(new fraction(argsArray[0])).toString();
    }
    else if(cmdname == "isinteger")
    {
        if(argsArray.length != 1) return "1 argument required";
        if(!isRational(argsArray[0])) return "Not a rational [" + argsArray[0] + "]";
        return rational.isInteger(new fraction(argsArray[0]));
    }
    else if(cmdname == "plus")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isRational(argsArray[0])) return "Not a rational [" + argsArray[0] + "]";
        if(!isRational(argsArray[1])) return "Not a rational [" + argsArray[1] + "]";
        return rational.plus(new fraction(argsArray[0]), new fraction(argsArray[1])).toString();
    }
    else if(cmdname == "minus")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isRational(argsArray[0])) return "Not a rational [" + argsArray[0] + "]";
        if(!isRational(argsArray[1])) return "Not a rational [" + argsArray[1] + "]";
        return rational.minus(new fraction(argsArray[0]), new fraction(argsArray[1])).toString();
    }
    else if(cmdname == "multiply")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isRational(argsArray[0])) return "Not a rational [" + argsArray[0] + "]";
        if(!isRational(argsArray[1])) return "Not a rational [" + argsArray[1] + "]";
        if(natural.isZero(new fraction(argsArray[1]).numerator)) return "Numerator of divisor is 0";
        
        return rational.multiply(new fraction(argsArray[0]), new fraction(argsArray[1])).toString();
    }
    else if(cmdname == "div")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isRational(argsArray[0])) return "Not a rational [" + argsArray[0] + "]";
        if(!isRational(argsArray[1])) return "Not a rational [" + argsArray[1] + "]";
        if(natural.isZero(new fraction(argsArray[1]).numerator)) return "Numerator of divisor is 0";
        
        return rational.div(new fraction(argsArray[0]), new fraction(argsArray[1])).toString();
    }
    else if(cmdname == "power")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isRational(argsArray[0])) return "First is not a rational [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Second is Not a natural [" + argsArray[1] + "]";
        
        return rational.power(new fraction(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    return "Команда не распознана";
}
var parsePolynomialCommand = function(cmdname, args)
{
    argsArray = args.replace(/ /g,"").split(",");

    if(cmdname == "plus")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isPolynomial(argsArray[0])) return "Argument is not a polynomial [" + argsArray[0] + "]";
        if(!isPolynomial(argsArray[1])) return "Argument is not a polynomial [" + argsArray[1] + "]";
        return polynomials.plus(new polynomial(argsArray[0]), new polynomial(argsArray[1])).toString();
    }
    else if(cmdname == "minus")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isPolynomial(argsArray[0])) return "Argument is not a polynomial [" + argsArray[0] + "]";
        if(!isPolynomial(argsArray[1])) return "Argument is not a polynomial [" + argsArray[1] + "]";
        return polynomials.minus(new polynomial(argsArray[0]), new polynomial(argsArray[1])).toString();
    }
    else if(cmdname == "multbyrational")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isPolynomial(argsArray[0])) return "Argument is not a polynomial [" + argsArray[0] + "]";
        if(!isRational(argsArray[1])) return "Argument is not a rational[" + argsArray[1] + "]";
        return polynomials.multByRational(new polynomial(argsArray[0]), new fraction(argsArray[1])).toString();
    }
    else if(cmdname == "multbyxpowerk")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isPolynomial(argsArray[0])) return "Argument is not a polynomial [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Not a natural числом[" + argsArray[1] + "]";
        return polynomials.multByXpowerk(new polynomial(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "greatdegree")
    {
        if(argsArray.length != 1) return "1 argument required";
        if(!isPolynomial(argsArray[0])) return "Argument is not a polynomial [" + argsArray[0] + "]";
        return polynomials.greatDegree(new polynomial(argsArray[0])).toString();
    }
    else if(cmdname == "tointegercoefficient")
    {
        if(argsArray.length != 1) return "1 argument required";
        if(!isPolynomial(argsArray[0])) return "Argument is not a polynomial [" + argsArray[0] + "]";
        var res = polynomials.toIntegerCoefficient(new polynomial(argsArray[0]));
        return res.multiplier.toString() + "(" + res.res.toString() + ")"
    }
    else if(cmdname == "multiply")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isPolynomial(argsArray[0])) return "Argument is not a polynomial [" + argsArray[0] + "]";
        if(!isPolynomial(argsArray[1])) return "Argument is not a polynomial [" + argsArray[1] + "]";
        return polynomials.multiply(new polynomial(argsArray[0]), new polynomial(argsArray[1])).toString();
    }
    else if(cmdname == "div")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isPolynomial(argsArray[0])) return "Argument is not a polynomial [" + argsArray[0] + "]";
        if(!isPolynomial(argsArray[1])) return "Argument is not a polynomial [" + argsArray[1] + "]";
        return polynomials.div(new polynomial(argsArray[0]), new polynomial(argsArray[1])).toString();
    }
    else if(cmdname == "mod")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isPolynomial(argsArray[0])) return "Argument is not a polynomial [" + argsArray[0] + "]";
        if(!isPolynomial(argsArray[1])) return "Argument is not a polynomial [" + argsArray[1] + "]";
        return polynomials.mod(new polynomial(argsArray[0]), new polynomial(argsArray[1])).toString();
    }
    else if(cmdname == "gcf")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isPolynomial(argsArray[0])) return "Argument is not a polynomial [" + argsArray[0] + "]";
        if(!isPolynomial(argsArray[1])) return "Argument is not a polynomial [" + argsArray[1] + "]";
        return polynomials.gcf(new polynomial(argsArray[0]), new polynomial(argsArray[1])).toString();
    }
    if(cmdname == "derivative")
    {
        if(argsArray.length != 1) return "1 argument required";
        if(!isPolynomial(argsArray[0])) return "Argument is not a polynomial [" + argsArray[0] + "]";
        return polynomials.derivative(new polynomial(argsArray[0])).toString();
    }
    if(cmdname == "calculate")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isPolynomial(argsArray[0])) return "Первый Argument is not a polynomial [" + argsArray[0] + "]";
        if(!isRational(argsArray[1])) return "Второй Not a rational [" + argsArray[1] + "]";
        return polynomials.calculate(new polynomial(argsArray[0]), new fraction(argsArray[1])).toString();
    }
    if(cmdname == "power")
    {
        if(argsArray.length != 2) return "2 arguments required";
        if(!isPolynomial(argsArray[0])) return "Первый Argument is not a polynomial [" + argsArray[0] + "]";
        if(!isNatural(argsArray[1])) return "Второй Not a natural [" + argsArray[1] + "]";
        return polynomials.power(new polynomial(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    if(cmdname == "roots")
    {
        if(argsArray.length != 1) return "1 argument required";
        if(!isPolynomial(argsArray[0])) return "Argument is not a polynomial [" + argsArray[0] + "]";
        var res = polynomials.roots(new polynomial(argsArray[0]));
        var str = "";
        for(var i = 0; i < res.length; i++)
        {
            str += res[i].toString();
            if(i != res.length - 1) str += ", "
        }
        return str;
    }
    if(cmdname == "tosingleroots")
    {
        if(argsArray.length != 1) return "1 argument required";
        if(!isPolynomial(argsArray[0])) return "Argument is not a polynomial [" + argsArray[0] + "]";

        return polynomials.toSingleRoots(new polynomial(argsArray[0])).toString();
    }
}