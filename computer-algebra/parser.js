/*
Некрасов Никита
Группа 7305
Функции для обработки ввода
*/

//Является ли строка натуральным числом
var isNaturalNumber = function(str)
{
    for(var i = 0; i < str.length; i++)
        if('0123456789'.indexOf(str.charAt(i)) == -1) return false;
    if(str.length == 0) return false;
    return true;
}
//Является ли строка целым числом
var isInteger = function(str)
{
    if(str.charAt(0) == "-") str = str.replace("-", "");
    return isNaturalNumber(str);
}
//Является ли строка рациональным числом
var isRational = function(str)
{
    if(isInteger(str)) return true;
    if(str.charAt(0) == "-") str = str.replace("-", "");
    str = str.split("/");

    return str.length == 2 && isNaturalNumber(str[0]) && isNaturalNumber(str[1]) && !natural.isZero(new longNumber(str[1]));
}
var isPolynomial = function(str)
{
    if(str.length == 0) return false;
    while(str.indexOf("^") != -1) str = str.replace("^", "");
    var nextCanBeNumber = true;
    var nextCanBeSign = true;
    var nextCanBeX = true;
    var nextCanBeFraction = false;
    for(var i = 0; i < str.length; i++)
    {
        var isNumber = false;
        var isSign = false;
        var isX = false;
        var isFraction = false;

        var state = 1; //1 coef, 2 degree

        if('0123456789'.indexOf(str.charAt(i)) != -1) isNumber = true;
        else if(str.charAt(i) == "+" || str.charAt(i) == "-") isSign = true;
        else if(str.charAt(i) == "x") isX = true;
        else if(str.charAt(i) == "/") isFraction = true;

        if(!isNumber && !isSign && !isX && !isFraction) return false;
        if(isNumber && !nextCanBeNumber) return false;
        if(isSign && !nextCanBeSign) return false;
        if(isX && !nextCanBeX) return false;
        if(isFraction && !nextCanBeFraction) return false;
        if(isNumber)
        {
            nextCanBeNumber = true;
            nextCanBeSign = true;
            if(state == 1)nextCanBeX = true;
            else nextCanBeX = false;
            if(state == 1)nextCanBeFraction = true;
            else nextCanBeFraction = false;
        }
        else if(isSign)
        {
            nextCanBeNumber = true;
            nextCanBeSign = false;
            nextCanBeX = true;
            nextCanBeFraction = false;
            state = 1;
        }
        else if(isX)
        {
            nextCanBeNumber = true;
            nextCanBeSign = true;
            nextCanBeX = false;
            nextCanBeFraction = false;
            state = 2;
        }
        else if(isFraction)
        {
            nextCanBeNumber = true;
            nextCanBeSign = false;
            nextCanBeX = false;
            nextCanBeFraction = false;
        }
    }
    return true;
}
//Выполнение команды
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
//Выполнение команды для наутральных числе и анализ ввода
var parseNaturalCommand = function(cmdname, args)
{
    argsArray = args.replace(/ /g,"").split(",");
    
    if(cmdname == "compare")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        var res = natural.compare(new longNumber(argsArray[0]), new longNumber(argsArray[1]));
        if(res == 2) return "" + argsArray[0] + " > " + argsArray[1];
        else if(res == 1) return "" + argsArray[0] + " < " + argsArray[1];
        else return "Числа равны";
    }
    else if(cmdname == "iszero")
    {
        if(argsArray.length != 1) return "Требуется 1 аргумент";
        if(!isNaturalNumber(argsArray[0])) return "Введено не натуральное число [" + argsArray[0] + "]";
        return !natural.isZero(new longNumber(argsArray[0]));
    }
    else if(cmdname == "addone")
    {
        if(argsArray.length != 1) return "Требуется 1 аргумент";
        if(!isNaturalNumber(argsArray[0])) return "Введено не натуральное число[" + argsArray[0] + "]";
        return natural.addOne(new longNumber(argsArray[0])).toString();
    }
    else if(cmdname == "plus")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        return natural.plus(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "minus")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        if(natural.compare(new longNumber(argsArray[0]), new longNumber(argsArray[1])) == 1) return "Первое число меньше второго";
        return natural.minus(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "multbydigit")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        if(argsArray[1].length != 1) return "Второй аргумент должен быть одной цифрой";
        return natural.multByDigit(new longNumber(argsArray[0]), parseInt(argsArray[1])).toString();
    }
    else if(cmdname == "multby10powerk")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        return natural.multBy10PowerK(new longNumber(argsArray[0]), parseInt(argsArray[1])).toString();
    }
    else if(cmdname == "multiply")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        return natural.multiply(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "minusmultiplied")
    {
        if(argsArray.length != 3) return "Требуется 3 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        if(!isNaturalNumber(argsArray[2])) return "Один из аргументов не натуральное число [" + argsArray[2] + "]";
        if(argsArray[2].length != 1) return "Третий аргумент должен быть одной цифрой";
        return natural.minusMultiplied(new longNumber(argsArray[0]), new longNumber(argsArray[1]), parseInt(argsArray[2])).toString();
    }
    else if(cmdname == "firstdigitbydiv")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        if(new longNumber(argsArray[1]).greatDigit() == -1) return "Делитель должен быть отличен от 0";
        return "" + natural.firstDigitByDiv(new longNumber(argsArray[0]), new longNumber(argsArray[1]));
    }
    else if(cmdname == "div")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        if(new longNumber(argsArray[1]).greatDigit() == -1) return "Делитель должен быть отличен от 0";
        return natural.div(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "mod")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        if(new longNumber(argsArray[1]).greatDigit() == -1) return "Делитель должен быть отличен от 0";
        return natural.mod(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "gcf")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        return natural.gcf(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "lcm")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        return natural.lcm(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "power")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        return natural.power(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "factorize")
    {
        if(argsArray.length != 1) return "Требуется 1 аргумент";
        if(!isNaturalNumber(argsArray[0])) return "Аргумент не натуральное число [" + argsArray[0] + "]";
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
        if(argsArray.length != 1) return "Требуется 1 аргумент";
        if(!isNaturalNumber(argsArray[0])) return "Аргумент не натуральное число [" + argsArray[0] + "]";
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
        if(argsArray.length != 1) return "Требуется 1 аргумент";
        if(!isInteger(argsArray[0])) return "Аргумент не целое число [" + argsArray[0] + "]";
        return integer.abs(new longNumber(argsArray[0]));
    }
    else if(cmdname == "ispositive")
    {
        if(argsArray.length != 1) return "Требуется 1 аргумент";
        if(!isInteger(argsArray[0])) return "Аргумент не целое число [" + argsArray[0] + "]";
        return integer.isPositive(new longNumber(argsArray[0]));
    }
    else if(cmdname == "multbyminusone")
    {
        if(argsArray.length != 1) return "Требуется 1 аргумент";
        if(!isInteger(argsArray[0])) return "Аргумент не целое число [" + argsArray[0] + "]";
        return integer.multbyminusone(new longNumber(argsArray[0]));
    }
    else if(cmdname == "plus")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isInteger(argsArray[0])) return "Один из аргументов не целое число [" + argsArray[0] + "]";
        if(!isInteger(argsArray[1])) return "Один из аргументов не целое число [" + argsArray[1] + "]";
        return integer.plus(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "minus")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isInteger(argsArray[0])) return "Один из аргументов не целое число [" + argsArray[0] + "]";
        if(!isInteger(argsArray[1])) return "Один из аргументов не целое число [" + argsArray[1] + "]";
        return integer.minus(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "multiply")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isInteger(argsArray[0])) return "Один из аргументов не целое число [" + argsArray[0] + "]";
        if(!isInteger(argsArray[1])) return "Один из аргументов не целое число [" + argsArray[1] + "]";
        return integer.multiply(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "div")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isInteger(argsArray[0])) return "Один из аргументов не целое число [" + argsArray[0] + "]";
        if(!isInteger(argsArray[1])) return "Один из аргументов не целое число [" + argsArray[1] + "]";
        if(natural.isZero(new longNumber(argsArray[1]))) return "Делитель не должен быть равен 0";
        return integer.div(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "mod")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isInteger(argsArray[0])) return "Один из аргументов не целое число [" + argsArray[0] + "]";
        if(!isInteger(argsArray[1])) return "Один из аргументов не целое число [" + argsArray[1] + "]";
        if(natural.isZero(new longNumber(argsArray[1]))) return "Делитель не должен быть равен 0";
        return integer.mod(new longNumber(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "power")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isInteger(argsArray[0])) return "Один из аргументов не целое число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
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
        if(argsArray.length != 1) return "Требуется 1 аргумент";
        if(!isRational(argsArray[0])) return "Аргумент не рациональное число [" + argsArray[0] + "]";
        return rational.reduce(new fraction(argsArray[0])).toString();
    }
    else if(cmdname == "isinteger")
    {
        if(argsArray.length != 1) return "Требуется 1 аргумент";
        if(!isRational(argsArray[0])) return "Аргумент не рациональное число [" + argsArray[0] + "]";
        return rational.isInteger(new fraction(argsArray[0]));
    }
    else if(cmdname == "plus")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isRational(argsArray[0])) return "Аргумент не рациональное число [" + argsArray[0] + "]";
        if(!isRational(argsArray[1])) return "Аргумент не рациональное число [" + argsArray[1] + "]";
        return rational.plus(new fraction(argsArray[0]), new fraction(argsArray[1])).toString();
    }
    else if(cmdname == "minus")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isRational(argsArray[0])) return "Аргумент не рациональное число [" + argsArray[0] + "]";
        if(!isRational(argsArray[1])) return "Аргумент не рациональное число [" + argsArray[1] + "]";
        return rational.minus(new fraction(argsArray[0]), new fraction(argsArray[1])).toString();
    }
    else if(cmdname == "multiply")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isRational(argsArray[0])) return "Аргумент не рациональное число [" + argsArray[0] + "]";
        if(!isRational(argsArray[1])) return "Аргумент не рациональное число [" + argsArray[1] + "]";
        
        return rational.multiply(new fraction(argsArray[0]), new fraction(argsArray[1])).toString();
    }
    else if(cmdname == "div")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isRational(argsArray[0])) return "Аргумент не рациональное число [" + argsArray[0] + "]";
        if(!isRational(argsArray[1])) return "Аргумент не рациональное число [" + argsArray[1] + "]";
        if(natural.isZero(new fraction(argsArray[1]).numerator)) return "Числитель делителя равен 0";
        
        return rational.div(new fraction(argsArray[0]), new fraction(argsArray[1])).toString();
    }
    else if(cmdname == "power")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isRational(argsArray[0])) return "Первый аргумент не рациональное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Второй аргумент не натуральное число [" + argsArray[1] + "]";
        
        return rational.power(new fraction(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    return "Команда не распознана";
}
var parsePolynomialCommand = function(cmdname, args)
{
    argsArray = args.replace(/ /g,"").split(",");

    if(cmdname == "plus")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isPolynomial(argsArray[0])) return "Аргумент не является многочленом [" + argsArray[0] + "]";
        if(!isPolynomial(argsArray[1])) return "Аргумент не является многочленом [" + argsArray[1] + "]";
        return polynomials.plus(new polynomial(argsArray[0]), new polynomial(argsArray[1])).toString();
    }
    else if(cmdname == "minus")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isPolynomial(argsArray[0])) return "Аргумент не является многочленом [" + argsArray[0] + "]";
        if(!isPolynomial(argsArray[1])) return "Аргумент не является многочленом [" + argsArray[1] + "]";
        return polynomials.minus(new polynomial(argsArray[0]), new polynomial(argsArray[1])).toString();
    }
    else if(cmdname == "multbyrational")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isPolynomial(argsArray[0])) return "Аргумент не является многочленом [" + argsArray[0] + "]";
        if(!isRational(argsArray[1])) return "Аргумент не рациональным числом[" + argsArray[1] + "]";
        return polynomials.multByRational(new polynomial(argsArray[0]), new fraction(argsArray[1])).toString();
    }
    else if(cmdname == "multbyxpowerk")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isPolynomial(argsArray[0])) return "Аргумент не является многочленом [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Аргумент не натуральное число числом[" + argsArray[1] + "]";
        return polynomials.multByXpowerk(new polynomial(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    else if(cmdname == "greatdegree")
    {
        if(argsArray.length != 1) return "Требуется 1 аргумент";
        if(!isPolynomial(argsArray[0])) return "Аргумент не является многочленом [" + argsArray[0] + "]";
        return polynomials.greatDegree(new polynomial(argsArray[0])).toString();
    }
    else if(cmdname == "tointegercoefficient")
    {
        if(argsArray.length != 1) return "Требуется 1 аргумент";
        if(!isPolynomial(argsArray[0])) return "Аргумент не является многочленом [" + argsArray[0] + "]";
        var res = polynomials.toIntegerCoefficient(new polynomial(argsArray[0]));
        return res.multiplier.toString() + "(" + res.res.toString() + ")"
    }
    else if(cmdname == "multiply")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isPolynomial(argsArray[0])) return "Аргумент не является многочленом [" + argsArray[0] + "]";
        if(!isPolynomial(argsArray[1])) return "Аргумент не является многочленом [" + argsArray[1] + "]";
        return polynomials.multiply(new polynomial(argsArray[0]), new polynomial(argsArray[1])).toString();
    }
    else if(cmdname == "div")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isPolynomial(argsArray[0])) return "Аргумент не является многочленом [" + argsArray[0] + "]";
        if(!isPolynomial(argsArray[1])) return "Аргумент не является многочленом [" + argsArray[1] + "]";
        return polynomials.div(new polynomial(argsArray[0]), new polynomial(argsArray[1])).toString();
    }
    else if(cmdname == "mod")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isPolynomial(argsArray[0])) return "Аргумент не является многочленом [" + argsArray[0] + "]";
        if(!isPolynomial(argsArray[1])) return "Аргумент не является многочленом [" + argsArray[1] + "]";
        return polynomials.mod(new polynomial(argsArray[0]), new polynomial(argsArray[1])).toString();
    }
    else if(cmdname == "gcf")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isPolynomial(argsArray[0])) return "Аргумент не является многочленом [" + argsArray[0] + "]";
        if(!isPolynomial(argsArray[1])) return "Аргумент не является многочленом [" + argsArray[1] + "]";
        return polynomials.gcf(new polynomial(argsArray[0]), new polynomial(argsArray[1])).toString();
    }
    if(cmdname == "derivative")
    {
        if(argsArray.length != 1) return "Требуется 1 аргумент";
        if(!isPolynomial(argsArray[0])) return "Аргумент не является многочленом [" + argsArray[0] + "]";
        return polynomials.derivative(new polynomial(argsArray[0])).toString();
    }
    if(cmdname == "calculate")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isPolynomial(argsArray[0])) return "Первый аргумент не является многочленом [" + argsArray[0] + "]";
        if(!isRational(argsArray[1])) return "Второй аргумент не рациональное число [" + argsArray[1] + "]";
        return polynomials.calculate(new polynomial(argsArray[0]), new fraction(argsArray[1])).toString();
    }
    if(cmdname == "power")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isPolynomial(argsArray[0])) return "Первый аргумент не является многочленом [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Второй аргумент не натуральное число [" + argsArray[1] + "]";
        return polynomials.power(new polynomial(argsArray[0]), new longNumber(argsArray[1])).toString();
    }
    if(cmdname == "roots")
    {
        if(argsArray.length != 1) return "Требуется 1 аргумент";
        if(!isPolynomial(argsArray[0])) return "Аргумент не является многочленом [" + argsArray[0] + "]";
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
        if(argsArray.length != 1) return "Требуется 1 аргумент";
        if(!isPolynomial(argsArray[0])) return "Аргумент не является многочленом [" + argsArray[0] + "]";

        return polynomials.toSingleRoots(new polynomial(argsArray[0])).toString();
    }
}
