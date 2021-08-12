* Horizontal wave-activity flux derived by Takaya and Nakamura (1999, 2001)
* See Eq. (38) of Takaya an Nakamura (2001)

*  Note that C_u in (38) is assumed to be zero, i.e. the wave is stationary.
* (C_u: vector that represents the phase propagation in the direction of U)

* Used data: monthly mean data of NCEP/NCAR reanalys 1

* Monthly-mean zonal and meridional wind (uwnd, vwnd), geopotential height (hgt)

* The data are available at 
* http://www.esrl.noaa.gov/psd/data/gridded/data.ncep.reanalysis.html

* The unit of level is [hPa]

* Basic state: climatology of monthly-mean field (January)
*                   averaged from 1980 to 2000.

* Perturbation: monthly-mean anomalies in January 1990.
*                 (deviation from climatology)

* Level: 250 hPa


*-----
'reinit'

* change the directory name
* u
'sdfopen uwnd.mon.mean.nc'
* v
'sdfopen vwnd.mon.mean.nc'

* height
'sdfopen hgt.mon.mean.nc'

'open z500_reg.ctl'

*Anomaly (Regression)
*'open F:\Programming\fortran\WAF\WAF\z500.ctl'

*  gas constant
'define Ra=290'
* earth radius
'define a=6400000'

'define dlat = cdiff(lat,y)*3.1415/180'
'define dlon = cdiff(lon,x)*3.1415/180'
'define coslat = cos(lat*3.1415/180)'
'define sinlat = sin(lat*3.1415/180)'
* Coriolis parameter
'define f = 2*7.24/100000*sinlat'
'define f0 = 2*7.24/100000*sin(43*3.14/180)'
'define g=9.8'

* unit [hPa]
'set lev 500'

* For drawing polar projection map
*'set lon -5 365'

* making basic state (climatology)
'set x 1 144'
'set y 1 73'
*'set t 229 492'
'define uclm = ave(uwnd.1,time=apr1967,time=apr2014,1yr)'
'define vclm = ave(vwnd.2,time=apr1967,time=apr2014,1yr)'
'define zclm = ave(hgt.3, time=apr1967,time=apr2014,1yr)'

* anomalies
*'define za=hgt.3(time=nov2014)-zclm'
'define za=z.4'

* QG stream function
'define psia=g/f*za'

* magnitude of basic state wind speed
'define magU = mag(uclm,vclm)'

'define dpsidlon = cdiff(psia,x)/dlon'
'define ddpsidlonlon = cdiff(dpsidlon,x)/dlon'

'define dpsidlat = cdiff(psia,y)/dlat'
'define ddpsidlatlat = cdiff(dpsidlat,y)/dlat'
'define ddpsidlatlon = cdiff(dpsidlat,x)/dlon'

'define termxu = dpsidlon*dpsidlon-psia*ddpsidlonlon'
'define termxv = dpsidlon*dpsidlat-psia*ddpsidlatlon'
'define termyv = dpsidlat*dpsidlat-psia*ddpsidlatlat'

* "p" is normalized by 1000hPa
'define coeff=coslat*(lev/1000)/(2*magU)'
*x-component
*define px = coeff/(a*a*coslat)*( uclm*termxu+ vclm/coslat*termxv)
* corrected on 14th Sep. 2015: Thanks to Yan Jin.
'define px = coeff/(a*a*coslat)*( uclm*termxu/coslat + vclm*termxv)'

*y-component
'define py = coeff/(a*a)*( uclm/coslat*termxv + vclm*termyv)'

'set lon 0 360'
'set lat 0 90'
'set grads off'
'set grid off'

'set gxout contour'

* QG stream-function
'set black -0.1 0.1'
'set cthick 20'
'set cint 500000'
'd maskout( psia,  abs(lat)-10)'

* horizontal wave-activity flux
'set arrscl 0.5 0.5'
'set arrowhead -0.3'
* maskout regions where 
* (i) QG approximation is supposed to be invalid (lower latitudes)
* (ii) westerly wind speed is weak or negative 
'd skip(px,3,3);maskout(maskout( py , abs(lat)-10),magU-5)'

'draw title sci_eeu wave activity flux '
'printim EEU_WAF_hf.png white'
*'disable print'
;
