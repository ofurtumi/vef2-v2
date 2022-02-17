# vef2-v2
æfing í express, psql, ejs og form validation

## Virkni
Það eru þrír meginhlutir sem hægt er að gera, tveir fyrir auðkenndan notanda einn fyrir hvern sem er.

### virkni fyrir admins
Fyrst þarf að skrá sig inn sem admin með því að smella á  **skrá inn** linkinn í header-menuinu.
~~~
    username: admin
    password: 123
~~~
1. Bæta við viðburðum

    Núna er þú admin. Þá er tvennt sem þú getur gert, sem hinn venjulegi notandi getur ekki.
    Þetta set ég saman sem einn hlut því báðar aðgerðirnar eru framkvæmdar á sama stað. 
    Fyrst þarf að opna **stjórnborð** með því að smella á tilsvarandi link í menu. 
    >*ATH. þessi linkur er aðeins til staðar fyrir þau sem eru skráð inn sem admin*

    Neðst á stjórnborðinu er að finna form sem er notað til þess að bæta við viðburðum. Það útskýrir sig nokkuð vel sjálft og er validatað þannig að ekki er hægt að setja of langa færslu eða neitt þannig.

2. Breyta og eyða viðburðum

    Þegar búið er að opna stjórnborðið er hægt að smella á hvaða viðburð sem er til þess að fá upp síðuna fyrir þann viðburð þar sem hægt er bæði að **breyta** viðburði og **eyða** honum.
    Þegar viðburði er **eytt** er fyrst athugað hvort hann hafi einhverjar skráningar, ef svo, eyða þeim fyrst og viðburðinum svo. Þetta er vegna þess að skráningar tengjast viðburðum með foreign key og sql leyfir ekki að eyða row sem önnur row þurfa til að virka.

### virkni fyrir regular joes
Sem venjulegur notandi er í raun aðeins eitt sem þú getur gert. Þú getur 'skráð' þig á viðburð. Þetta er gert með athugasemdum undir viðburðarfærslum. Eftir að smella á viðburð opnast síðan fyrir tilsvarandi viðburð og bíður þér að skrá þig.

## Hosting
verkefnið er sett upp á Heroku, með Heroku Postgres viðbótinni sem gagnagrunn. 
>Linkur á síðuna er [v2-vef2.herokuapp.com](https://v2-vef2.herokuapp.com/)