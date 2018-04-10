/*
Некрасов Никита
Группа 7305
Класс рационального числа
*/
class fraction
{
    constructor(data)
    {
        
        if(typeof(data) == "string")
        {
            if(data.indexOf("/") == -1)
            {
                this.numerator = new longNumber(data);
                this.denominator = new longNumber("1");
                this.positive = this.numerator.positive;
                this.numerator.positive = true;
            }
            else
            {
                data = data.split("/");
                this.numerator = new longNumber(data[0]);
                this.denominator = new longNumber(data[1]);
                this.positive = this.numerator.positive == this.denominator.positive;
                this.numerator.positive = true;
                this.denominator.positive = true;
            }
        }
        else if(data == null)
        {
            this.positive = true;
            this.numerator = new longNumber("1");
            this.denominator = new longNumber("1");
        }
        else if(typeof(data) == "object")
        {
            this.numerator = data.numerator.createCopy();
            this.denominator = data.denominator.createCopy();
            this.positive = data.positive;
        }

    }
    createCopy()
    {
        return new fraction(this);
    }
    toString()
    {
        var res = "";
        if(!this.positive)res += "-";
        if(natural.compare(this.denominator, new longNumber("1")) == 0) res += this.numerator.toString();
        else res += this.numerator.toString() + "/" + this.denominator.toString();
        return res;
    }
    toStringNoMinus()
    {
        var res;
        if(natural.compare(this.denominator, new longNumber("1")) == 0) res = this.numerator.toString();
        else res = this.numerator.toString() + "/" + this.denominator.toString();
        return res;
    }
}