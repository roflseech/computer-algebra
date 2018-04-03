var isNaturalNumber = function(str)
{
    for(var i = 0; i < str.length; i++)
        if('0123456789'.indexOf(str.charAt(i)) == -1) return false;
    if(str.length == 0) return false;
    return true;
}
var isInteger = function(str)
{
    if(str.charAt(0) == "-") str = str.replace("-", "");
    return isNaturalNumber(str);
}
var isRational = function(str)
{
    if(str.charAt(0) == "-") str = str.replace("-", "");
    str = str.split("/");

    return str.length == 2 && isNaturalNumber(str[0]) && isNaturalNumber(str[1]) && !natural.isZero(new longNumber(str[1]));
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
}

var parseNaturalCommand = function(cmdname, args)
{
    argsArray = args.replace(/ /g,"").split(",");
    
    if(cmdname == "compare")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        return natural.compare(new longNumber(argsArray[0]), new longNumber(argsArray[1]));
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
        return natural.multiplyByDigit(new longNumber(argsArray[0]), parseInt(argsArray[1])).toString();
    }
    else if(cmdname == "multby10powk")
    {
        if(argsArray.length != 2) return "Требуется 2 аргумента";
        if(!isNaturalNumber(argsArray[0])) return "Один из аргументов не натуральное число [" + argsArray[0] + "]";
        if(!isNaturalNumber(argsArray[1])) return "Один из аргументов не натуральное число [" + argsArray[1] + "]";
        return natural.multiplyBy10PowerK(new longNumber(argsArray[0]), parseInt(argsArray[1])).toString();
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
    else if(cmdname == "firstdiv")
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
    return "Команда не распознана";
}

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
    return "Команда не распознана";
}

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
        if(natural.isZero(new fraction(argsArray[1]).numerator)) return "Числитель делителя равен 0";
        
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
    return "Команда не распознана";
}