class fraction
{
    constructor(data)
    {
        
        if(typeof(data) == "string")
        {
            data = data.split("/");
            this.numerator = new longNumber(data[0]);
            this.denominator = new longNumber(data[1]);
            this.positive = this.numerator.positive == this.denominator.positive;
            this.numerator.positive = true;
            this.denominator.positive = true;
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

        return res + this.numerator.toString() + "/" + this.denominator.toString();
    }
}