# FE-38 – Undersök integrationstestning

## Verktygens roller

- **Vitest** kör testerna och kontrollerar resultatet.
- **React Testing Library** visar komponenter i testmiljön och låter oss testa det användaren ser och gör.
- **MSW** fångar upp API-anrop och ger mockade svar, så att backend inte behöver köras.

## Skillnaden mellan testnivåerna

- **Komponenttest:** Testar en komponent. Exempel: ProductCard visar rätt produkt och reagerar på Add to cart.
- **Frontend-integrationstest:** Testar flera frontenddelar tillsammans med ett mockat API. Exempel: produktsidan hämtar produkter och visar dem.
- **End-to-end-test:** Testar ett helt användarflöde i en riktig webbläsare. Exempel: logga in, lägga en produkt i varukorgen och skicka en order. Med verklig backend testas även hela kedjan.

## Hur verktygen används tillsammans

Vitest kör testet. React Testing Library renderar produktsidan. När sidan hämtar produkter svarar MSW med testdata. Testet kontrollerar sedan att produkterna visas.

MSW kan också ge felsvar, till exempel 401 eller 500, för att testa hur frontend hanterar dem. Det testar däremot inte att den riktiga backend fungerar.

## Källor

- [Vitest – Mocking Requests](https://vitest.dev/guide/mocking/requests)
- [React Testing Library – Introduction](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright – Introduction till end-to-end-testning](https://playwright.dev/docs/intro)
