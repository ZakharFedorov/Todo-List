# Project - Simple TO-DO system

## Description
Aplikace slouží pro zprávu úkolů či cílů. Umožní úkol přidat, upravit, označit jako hotový, smazat kompletně a samozřejmě zobrazit samotný seznam aktuálních / hotových úkolů (CRUD operace).

Seznam úkolů je k dispozici ve formátech HTML a JSON. Všechny výstupy (HTML, CSS, JSON) jsou validní dle pravidel příslušného jazyka

A jednoduché ověření uživatelského přistupu.

---
## How to use it

- Na přihlašovací stránce se můžete přihlásit k účtu
- Na hlavní stránce:
  - Můžete vidět všechny úkoly
  - Můžete vytvořit nový úkol tak, že do řádku napíšete text a kliknete na tlačítko "ADD".
  - Můžete upravit úkol kliknutím na tlačítko "Upravit" s obrázkem tužky. Po úpravě musíte kliknout na tlačítko "Uložit" s obrázkem diskety.
  - Můžete odstranit úkol kliknutím na tlačítko "Smazat" s obrázkem koše
  - Můžete nedokončený úkol označit jako dokončený kliknutím na prázdný čtverec poblíž textu úkolu
  - Můžete dokončený úkol označit jako nedokončený kliknutím na vyplněný se zaškrtnutím čtverec poblíž textu úkolu

---
## Test users

[//]: # (Add test users)

| Email          | Password               |
|----------------|------------------------|
| test@tul.cz    | test228                |
| test2@tul.cz   | test2228               |
-------------------------------------------

## URL output

1. https://to-do-list-ldku.onrender.com

## Html output

1. https://to-do-list-ldku.onrender.com/todo

## Json output

> Nejprve se musíte přihlásit
1. https://to-do-list-ldku.onrender.com/json

---

## HTML validation

1. https://validator.w3.org/nu/?showsource=yes&doc=https%3A%2F%2Fto-do-list-ldku.onrender.com
2. https://validator.w3.org/nu/?showsource=yes&doc=https%3A%2F%2Fto-do-list-ldku.onrender.com%2Ftodo
3. https://validator.w3.org/nu/?showsource=yes&doc=https%3A%2F%2Fto-do-list-ldku.onrender.com%2Fjson

## CSS validation

1. https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fto-do-list-ldku.onrender.com&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=ru
2. https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fto-do-list-ldku.onrender.com%2Ftodo&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=ru
3. https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fto-do-list-ldku.onrender.com%2Fjson&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=ru

---
## Použité technologie 

**JavaScript** - Multiplatformní, objektově orientovaný, událostmi řízený skriptovací jazyk
-
**Firebase** - NoSQL a real-time hosting databází. K dispozici je API pro šifrování dat

**Firebase Authentication and Firestore Database**

**Express.js** - je backendový webový aplikační rámec pro vytváření RESTful API s Node.js

---