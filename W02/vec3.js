class Vec3
{

    // Constructor
    constructor( x , y , z )
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add( v )
    {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    sum()
    {
        return this.x + this.y + this.z;

    }

    sub( v )
    {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }


    min()
    {
        let m;
        if(this.x<this.y){
            m = this.x;
        }else{
            m = this.y;
        }

        if(this.z<m){
            return this.z;
        }else{
            return m;
        }

    }

    mid()
    {
        return this.sum() - this.min() - this.max();
    }

    max()
    {
        let m;
        if(this.x<this.y){
             m = this.y;
        }else{
             m = this.x;
        }

        if(this.z<m){
            return m;
        }else{
            return this.z;
        }
    }

    cross( v )
    {
        var x = this.x, y = this.y, z = this.z;
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        return this;
    }

    length()
    {
        return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
    }

}