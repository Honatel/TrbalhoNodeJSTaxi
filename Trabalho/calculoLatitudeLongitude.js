function CalcRadiusDistance(lat1, lon1, lat2, lon2) {
    var RADIUSMILES = 3961,
        RADIUSKILOMETERS = 6373,
        latR1 = this.deg2rad(lat1),
        lonR1 = this.deg2rad(lon1),
        latR2 = this.deg2rad(lat2),
        lonR2 = this.deg2rad(lon2),
        latDifference = latR2 - latR1,
        lonDifference = lonR2 - lonR1,
        a  = Math.pow(Math.sin(latDifference / 2), 2) + Math.cos(latR1) * Math.cos(latR2) * Math.pow(Math.sin(lonDifference / 2), 2),
        c  = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
        dm = c * RADIUSMILES,
        dk = c * RADIUSKILOMETERS;
    	this.mi = this.round(dm);
    	this.km = this.round(dk);
}
CalcRadiusDistance.prototype.deg2rad = function (deg) {
    var rad = deg * Math.PI / 180;
    return rad;
};
CalcRadiusDistance.prototype.round = function (x) {
    return Math.round(x * 10) / 10;
};



function CalcRadiusDistance(lat1, lon1, lat2, lon2) {
    var RADIUSMILES = 3961,
        RADIUSKILOMETERS = 6373,
        latR1 = lat1 * Math.PI / 180,
        lonR1 = lon1 * Math.PI / 180,
        latR2 = lat2 * Math.PI / 180,
        lonR2 = lon2 * Math.PI / 180,
        latDifference = latR2 - latR1,
        lonDifference = lonR2 - lonR1,
        a  = Math.pow(Math.sin(latDifference / 2), 2) + Math.cos(latR1) * Math.cos(latR2) * Math.pow(Math.sin(lonDifference / 2), 2),
        c  = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
        dm = c * RADIUSMILES,
        dk = c * RADIUSKILOMETERS;
    	this.mi =  Math.round(dm * 10) / 10;
    	this.km = Math.round(dk* 10) / 10;
}

///////////////////////////// mais uma função

<%
lat1=-35.17
lon1=149.08
lat2=59.35
lon2=18.06
X = (Sin(lat1 / 57.2958) * Sin(lat2 / 57.2958)) + (Cos(lat1 / 57.2958) * Cos(lat2 / 57.2958) * Cos(lon2 / 57.2958 - lon1 / 57.2958))
miles = formatnumber(3963 * (Atn(-X / Sqr(-X * X + 1)) + 2 * Atn(1)),2)
nmiles = formatnumber(3438 / 3963 * miles,2)
km = formatnumber(6378 / 3963 * miles,2)
%>
