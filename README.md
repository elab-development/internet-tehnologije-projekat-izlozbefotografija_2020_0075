![Untitled (1)](https://github.com/elab-development/internet-tehnologije-projekat-izlozbefotografija_2020_0075/assets/96752397/63e4ca6a-6663-4d56-99af-38acaa9ed1a9)

Reč je o web aplikaciji galerije koja organizuje izložbe slika. Aplikacija ima tri moguće korisničke uloge: administratora, ulogovanog korisnika i neulogovanog korisnika.

## Funkcionalnosti za neulogovanog korisnika:
- pristup osnovnim informacijama o galeriji i izložbama
- uvid u slike koje su izložene na ovim izložbama
- prijava na newsletter galerije
- kreiranje naloga na aplikaciji

## Funkcionalnosti za ulogovanog korisnika:
- pristup osnovnim informacijama o galeriji i izložbama
- uvid u slike koje su izložene na ovim izložbama
- prijava na newsletter galerije
- rezervacija karata za izložbe
- preuzimanje rezervisanih karata u pdf formatu
- pristup profilu
- izmena lozinke

## Funkcionalnosti za administratora:
- kreiranje nove, izmena postojeće, brisanje postojeće izložbe
- dodavanje ili uklanjanje dela koja su prikazana za svaku od izložbi
- uvid u korisnike koji su se prijavili na newsletter i mogućnost brisanja ovih korisnika
- uvid u postojeća dela u bazi, kao i njihovo kreiranje, brisanje i upload fotografija za svako od postojećih dela
- pristup statistici o rezervisanim kartama po mesecima
- pristup profilu

# Korišćene tehnologije
- Laravel
- React
- MySQL

# Pokretanje aplikacije
Najpre je potrebno pookrenuti Apache i MySQL u okviru XAMPP-a.
Zatim je potrebno pokrenuti redom sledeće komande:
### Kloniranje
- `git clone https://github.com/elab-development/internet-tehnologije-projekat-izlozbefotografija_2020_0075.git`
- `git checkout master`
### Backend
- `copy .env.example .env`
- u _.env_ fajlu definisati naziv baze kao na primer DB_DATABASE=gallery
- `composer install`
- `php artisan key:generate`
- `php artisan migrate`
- `php artisan db:seed`
- `php artisan storage:link`
- `php artisan serve`
### Frontend
- `cd gallery-front`
- `npm install`
- `npm start`

