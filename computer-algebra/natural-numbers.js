//Функции для работы с натуральными числами
//Nekrasov Nikita

//Примечание:
//nn = natural number

var natural = {};


//Сравнение натуральных чисел: 2 - если первое больше второго, 0, если равно, 1 иначе.
natural.compare = function(nn1, nn2)
{
    if(nn1.greatDigit() > nn2.greatDigit()) return 2;
    else if(nn1.greatDigit() < nn2.greatDigit()) return 1;
    else
    {
        for(var i = nn1.greatDigit(); i >= 0; i--)
        {
            if(nn1.getDigit(i) > nn2.getDigit(i)) return 2;
            else if(nn2.getDigit(i) > nn1.getDigit(i)) return 1;
        }
    }
    return 0;
}
//Проверка на ноль: если число не равно нулю, то «да» иначе «нет»
natural.isZero = function(nn)
{
    return nn.greatDigit() == -1;
}
//Добавление 1 к натуральному числу
natural.addOne = function(nn)
{
    var res = nn.createCopy();

    for(var i = 0; ; i++)
    {
        if(res.getDigit(i) == 9)
        {
            res.setDigit(i, 0);
        }
        else
        {
            res.setDigit(i, res.getDigit(i) + 1);
            break;
        } 
    }
    return res;
}
//сложение nn1 и nn2
natural.plus = function(nn1, nn2)
{
    var greatDigit12 = nn1.greatDigit() > nn2.greatDigit() ? nn1.greatDigit() : nn2.greatDigit();
    res = new longNumber("");
    var nextPlus = 0;
    for(var i = 0; i <= greatDigit12 || nextPlus != 0; i++)
    {
        nextPlus += nn1.getDigit(i) + nn2.getDigit(i);
        res.setDigit(i, nextPlus % 10);
        if(nextPlus >= 10) nextPlus = 1;
        else nextPlus = 0;
    }
    return res;
}
//вычитание nn2 из nn1
natural.minus = function(nn1, nn2)
{
    if(natural.compare(nn2, nn1) == 2) return new longNumber("");

    var res = new longNumber("");
    var curDigit = 0;
    for(var i = 0; i <= nn1.greatDigit(); i++)
    {
        curDigit += (nn1.getDigit(i) - nn2.getDigit(i));

        res.setDigit(i, curDigit < 0 ? (curDigit + 10) : curDigit);
        if(curDigit < 0) curDigit = -1;
        else curDigit = 0;
    }
    return res;
}
//Умножение натурального числа на цифру
natural.multiplyByDigit = function(nn, digit)
{
    if(digit > 9 || digit < 0) return new longNumber("0");
    var res = nn.createCopy();

    var nextDigitPlus = 0;
    for(var i = 0; i <= res.greatDigit() || nextDigitPlus != 0; i++)
    {
        var tmp = res.getDigit(i) * digit + nextDigitPlus;
        res.setDigit(i, tmp % 10);
        nextDigitPlus = Math.floor(tmp/10);
    }
    return res;
}
//умножение числа на 10^k
natural.multiplyBy10PowerK= function(nn, k)
{
    if(k < 0) return new longNumber("");
    var res = new longNumber("");

    for(var i = 0; i <= nn.greatDigit(); i++)
    {
        res.setDigit(i + k, nn.getDigit(i));
    }

    return res;
}
//умножение натуральных чисел
natural.multiply = function(nn1, nn2)
{
    var res = new longNumber("");

    for(var i = 0; i <= nn2.greatDigit(); i++)
    {
        var mult = natural.multiplyByDigit(nn1, nn2.getDigit(i));
        if(i != 0) mult = natural.multiplyBy10PowerK(mult, i);
        res = natural.plus(res, mult);
    }

    return res;
}
//вычитание из натурального другого натурального, домжноженного на цифру, для случая положительного результата
natural.minusMultiplied = function(nn1, nn2, k)
{
    var mult = natural.multiplyByDigit(nn2, k);

    if(natural.compare(mult, nn1) == 2) return new longNumber("");

    var res = natural.minus(nn1, mult);

    return res;
}
//Вычисление первой цифры деления большего натурального на меньшее, домноженное на 10^k, где k - номер позиции этой цифры (номер считается с нуля)
natural.firstDigitByDiv = function(nn1, nn2)
{
    var nn = nn1.createCopy();
    var great_digit_diff = nn1.greatDigit() - nn2.greatDigit();
    var sub = natural.multiplyBy10PowerK(nn2, great_digit_diff);

    if(natural.compare(nn1, sub) == 1)
    {
        sub = natural.multiplyBy10PowerK(nn2, great_digit_diff - 1);
    }
    var i = 0;
    while(natural.compare(nn, sub) != 1)
    {
        i++;
        nn = natural.minus(nn, sub);
    }
    
    return i;
}
//Деление натуральных чисел
natural.div = function(nn1, nn2)
{
    if(natural.compare(nn2, nn1) == 2) return new longNumber("");

    var res = new longNumber("");
    var ost = nn1.createCopy();

    while(natural.compare(ost, nn2) != 1)
    {
        var currentDigit = natural.firstDigitByDiv(ost, nn2);
        var sub = natural.multiplyByDigit(nn2, currentDigit);
        var diff = ost.greatDigit() - sub.greatDigit();

        var sub1 = natural.multiplyBy10PowerK(sub, diff);
        if(natural.compare(sub1, ost) == 2)
        {
            diff = diff - 1;
            sub = natural.multiplyBy10PowerK(sub, diff);
        }
        else sub = sub1;
        ost = natural.minus(ost, sub);
        res.setDigit(diff, currentDigit);
    }

    return res;
}
//Остаток от деления натуральных чисел
natural.mod = function(nn1, nn2)
{
    var res = natural.minus(nn1, natural.multiply(natural.div(nn1, nn2), nn2));
    return res;
}
//НОД
natural.gcf = function(nn1, nn2)
{
    if(natural.isZero(nn1)) return nn2;
    if(natural.isZero(nn2)) return nn1;
    var greater;
    var lesser;

    if(natural.compare(nn1, nn2) == 2)
    {
        greater = nn1.createCopy();
        lesser = nn2.createCopy();
    }
    else
    {
        greater = nn2.createCopy();
        lesser = nn1.createCopy();
    }

    var zero = new longNumber("");
    while(natural.compare(lesser, zero) != 0)
    {
        var tmp = lesser;
        lesser = natural.mod(greater, lesser)
        greater = tmp;
    }
    return greater;
}
//НОК
natural.lcm = function(nn1, nn2)
{
    var zero = new longNumber("");
    if(natural.compare(nn1, zero) == 0) return zero;
    if(natural.compare(nn2, zero) == 0) return zero;
    var res = natural.div(natural.multiply(nn1, nn2), natural.gcf(nn1, nn2));

    return res;
}