/*
Некрасов Никита
Группа 7305
Класс многочлена, содержит всего одно поле - firstCoef. 
firstCoef - это объект для представления слогаемого многочлена с наибольшей степенью. 
Одновременнос  этим, firstCoef этокорневой элемент списка слогаемых многочлена
*/
class polynomial
{
    //если data - строка с числами, то создаёт число на её основе
    constructor(data)
    {
        if(typeof(data) === 'string')
        {
            while(data.indexOf("^") != -1) data = data.replace("^", "");

            var addArray = new Array();
            var begin = 0;
            for(var i = 0; i < data.length; i++)
            {
                if(data.charAt(i) == "+")
                {
                    addArray.push(data.substring(begin, i));
                    begin = i + 1;

                }
                else if(data.charAt(i) == "-")
                {
                    addArray.push(data.substring(begin, i));
                    begin = i;
                }
                else if(i == data.length - 1)
                {
                    addArray.push(data.substring(begin, i + 1));
                }
            }
            for(var i = 0; i < addArray.length; i++)
            {
                var str = addArray[i].split("x");
                
                var coef;
                var degree;
                if(str.length == 2)
                {
                    if(str[0] == "") coef = new fraction("1");
                    else coef = new fraction(str[0]);
                    if(str[1] == "") degree = new longNumber("1");
                    else degree = new longNumber(str[1]);
                }
                else
                {
                    degree = new longNumber("0");
                    coef = new fraction(str[0]);
                }
                this.addCoef(degree, coef);
            }
        }
        else if(data == null)
        {
            this.firstCoef = null;
        }
        else if(typeof(data) == 'object')
        {
            for(var i = data.firstCoef; i != null; i = i.next)
                this.setCoef(i.degree, i.coef);
        }
    }
    setCoef(degree, coef)
    {
        if(!natural.isZero(coef.numerator))
        {
            if(this.firstCoef == null)
            {
                this.firstCoef = {};
                this.firstCoef.next = null;
                this.firstCoef.prev = null;
                this.firstCoef.degree = degree.createCopy();
                this.firstCoef.coef = coef.createCopy();
            }
            else
            {
                var cur = this.firstCoef;
                var done = false;
                if(natural.compare(degree, this.firstCoef.degree) == 2)
                {
                    var tmp = this.firstCoef;
                    this.firstCoef = {};
                    this.firstCoef.next = tmp;
                    this.firstCoef.prev = null;
                    this.firstCoef.degree = degree.createCopy();
                    this.firstCoef.coef = coef.createCopy();
                }
                else while(!done)
                {
                    if(natural.compare(degree, cur.degree) == 0)
                    {
                        cur.coef = coef.createCopy();
                        done = true;
                    }
                    else if(natural.compare(degree, cur.degree) == 1 && (cur.next == null || natural.compare(degree, cur.next.degree) == 2))
                    {
                        if(cur.next == null)
                        {
                            cur.next = {};
                            cur.next.next = null;
                            cur.next.prev = cur;
                            cur.next.degree = degree.createCopy();
                            cur.next.coef = coef.createCopy();
                        }
                        else
                        {
                            var tmp = {};
                            tmp.degree = degree.createCopy();
                            tmp.coef = coef.createCopy();
                            tmp.prev = cur;
                            tmp.next = cur.next;
                            cur.next.prev = tmp;
                            cur.next = tmp;
                        }
                        done = true;
                    }
                    cur = cur.next;
                }
    
            }
        }
        else
        {
            var cur = this.firstCoef;
            while(cur != null)
            {
                if(natural.compare(cur.degree, degree) == 0)
                {
                    if(cur.prev != null) cur.prev.next = cur.next;
                    else this.firstCoef = cur.next;
                    if(cur.next != null) cur.next.prev = cur.prev
                    return;
                }
                cur = cur.next;
            }
        }
    }
    getCoef(degree)
    {
        var cur = this.firstCoef;
        while(cur != null)
        {
            if(natural.compare(cur.degree, degree) == 0) return cur.coef.createCopy();
            cur = cur.next;
        }
        return new fraction("0/1");
    }
    addCoef(degree, coef)
    {
        if(!natural.isZero(this.getCoef(degree).numerator))
        {
            this.setCoef(degree, rational.plus(this.getCoef(degree), coef));
        }
        else this.setCoef(degree, coef);
    }
    greatDegreeCoef()
    {
        if(firstCoef == null) return new longNumber("-1");
        return firstCoef.degree.createCopy();
    }
    greatDegree()
    {
        return this.firstCoef;
    }
    toString()
    {
        var str = "";
        var cur = this.firstCoef;
        while(cur != null)
        {
            if(cur === this.firstCoef && !cur.coef.positive) str += "-";
            if(natural.compare(cur.coef.numerator, new longNumber("1")) != 0 ||
            natural.compare(cur.coef.denominator, new longNumber("1")) != 0) str += cur.coef.toStringNoMinus();
            else if(natural.isZero(cur.degree)) str += cur.coef.toStringNoMinus();
            
            if(natural.compare(cur.degree, new longNumber("1")) == 0)str += "x";
            else if(!natural.isZero(cur.degree))str += "x^" + cur.degree.toString();

            if(cur.next != null && cur.next.coef.positive)
            {
                str += " + ";
            }
            else if(cur.next != null && !cur.next.coef.positive)
            {
                str += " - ";
            }
            cur = cur.next;
        }
        return str;
    }
    createCopy()
    {
        return new polynomial(this);
    }
}
