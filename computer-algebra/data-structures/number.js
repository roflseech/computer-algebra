/*
Некрасов Никита
Группа 7305
Класс целого числа
*/
class longNumber
{
    //если data - строка с числами, то создаёт число на её основе
    constructor(data)
    {
        this.digits = new Array();
        if(typeof(data) === 'string')
        {
            var len = data.length;
            if(data.charAt(0) == '-')
            {
                data = data.replace("-", "");
                this.positive = false;
                len--;
            }
            else
            {
                this.positive = true;
            }
            for(var i = 0; i < len; i++)
            {
                this.setDigit(i, parseInt(data.charAt(len - 1 - i)));
            }
        }
        else if(typeof(data) == 'object')
        {
            this.positive = data.positive;
            for(var i = 0; i <= data.greatDigit(); i++)
            {
                this.digits[i] = data.digits[i];
            }
        }
    }
    removeAllAfter(position)
    {
        if(this.digits.length != 0) this.digits.splice(position + 1, this.greatDigit() - position);
    }
    setDigit(position, value)
    {
        if(this.greatDigit() >= position) this.digits[position] = value;
        else
        {
            for(var i = this.greatDigit() + 1; i < position; i++) this.digits[i] = 0;
            this.digits[position] = value;
        }
        
        if(value == 0 && position == this.greatDigit())
        {
            var new_great_digit = position;
            for(new_great_digit; this.digits[new_great_digit] == 0 && new_great_digit >= 0; new_great_digit--);
            this.removeAllAfter(new_great_digit);
        }
        if(this.greatDigit() == -1) this.positive = true;
    }
    getDigit(position)
    {
        if(this.greatDigit() < position) return 0;
        return this.digits[position];
    }
    greatDigit()
    {
        return this.digits.length - 1;
    }
    toString()
    {
        if(this.greatDigit() == -1) return "0";
        var str = "";
        if(!this.positive) str += "-";
        for(var i = this.greatDigit(); i >= 0; i--)
        {
            str += this.digits[i];
        }
        return str;
    }
    createCopy()
    {
        return new longNumber(this);
    }
}