
#### Running the app: npm run dev

## Description

Aplikacija za on-lajn kupovinu slatkiša

Aplikacija treba da omogući administratoru aplikacije da može da uređuje katalog on-lajn prodavnice za prodaju slatkiša. Administrator treba da bude prijavljen da bi mogao da uređuje katalog. Za svaki proizvod, administrator treba da obeleži najosnovnije karakteristike, među kojima su cena, vrsta slatkiša, zemlja porekla, osnovni sastojci (čokolada, keks, voće), boja itd. Prilikom dodavanja slatkiša u katalog, može da se izvrši upload jedne ili više slika, a u panelu za uređivanje slika može da obeleži samo jedna slika kao primarna koja će se prikazivati. Aplikacija podržava samo JPEG i PNG formate datoteka slika. Korisnici mogu da vrše pretragu po filterima, među kojima su opseg cena, vrsta slatkiša, boja, osnovni sastojci itd. Rezultati pretrage treba da prikazuju listu slatkiša, a kad se otvori stranica, svi podaci treba da budu prikazani na pregledan način, a da budu uočljivi i uvek dostupni u prikazu strane. Prikaz svih slatkiša treba rešiti na vizualno identičan način kao i prikaz u rezultatima pretrage ili prelistavanjem po kategorijama. Kada korisnik doda slatkiš u korpu za kupovinu, treba da unese količinu (komad ili gram, zavisno od toga koja je jedinica mere podešena za konkretan slatkiš). Na kraju kupovine, korisniku treba prikazati ukupan iznos i formular za unos podataka za isporuku na kućnu adresu. Podaci se čuvaju u bazi podataka, a u administrativnom panelu, administrator može da obeleži porudžbinu kao realizovanu ili kao odbijenu. Omogućiti responsive dizajn, tako da stranice za pregled cveća budu prilagođene i za mobilne telefone.

Ograničenja:
Aplikacija mora da bude realizovana na Node.js platformi korišćenjem Nest.js razvojnog okvira i sav kôd aplikacije treba da bude organizovan prema pravilima MVC arhitekture. Baza podataka mora da bude relaciona i treba koristiti MySQL/MariaDB RDBMS. Sav generisani HTML kôd koji proizvodi aplikacija mora da bude 100% validan, tj. da generisani kôd prođe proveru W3C Validatorom (dopuštena su upozorenja, ali ne i greške). Aplikacija može grafički korisnički interfejs da generiše na strani servera, korišćenjem šablona za generisanje HTML koda (proizvoljan templating engine, integrisan sa Nest.js aplikacijom) ili da bude serviran statički deo stranice koji pomoću JavaScript-a dinamički formira komponente na front-end-u, a podatke doprema asinhrono kroz veb servis (API) metode obezbeđene u okviru same aplikacije.
Potrebno je obezbediti određeni stepen provere podataka koji se od korisnika upućuju aplikaciji. Moguća su četiri sloja zaštite i to: (1) HTML pattern u poljima za unos podataka u formularima; (2) JavaScript validacija vrednosti unetih u polja za unos podataka u formularima na front-end-u; (3) Provera korišćenjem adekvatnih testova ili korišćenjem regularnih izraza na strani servera u Node.js aplikaciji (moguće je i korišćenjem izričitih šema - Schema) i (4) provera na nivou baze podataka korišćenjem okidača nad samim tabelama baze podataka.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```
