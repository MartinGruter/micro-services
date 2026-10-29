 ### Ansvar 
Vår frontend applikation micro-services ansvarar för att användare kan logga in, välja produkter med hjälp av sökning och kategorifilter, lägga till produkter i varukorg och skicka order. Som admin kan man även skapa produkter. 

### Teknik

Applikationen är byggd med React och React Router v7 i framework mode, vilket innebär att sidorna renderas på servern och att inloggningen kan hanteras säkert där. Koden är skriven i TypeScript, bygget sköts av Vite och utseendet av Tailwind CSS. Efter inloggning sparas JWT i en signerad httpOnly-cookie på serversidan, så att token inte är åtkomlig för JavaScript i webbläsaren. Varukorgen sparas i webbläsarens sessionStorage.

### Databas, miljövariabler och port

Frontend har ingen egen databas, utan ansluter till mikrotjänsterna som använder neon. Vi använder miljövariabler VITE_GATEWAY_URL=http://localhost:9003/gateway för att koppla oss till vår gateway som i sin tur kopplar oss till mikrotjänsterna, NODE_ENV=development för att tala om för node vilket läge appen körs i. Development för lokalt och production när applikationen är deployed. SESSION_SECRET för att signera __session cookien. Vår frontends port är 5173.

### Länkar till övriga repositories

https://github.com/AnwarAsry/gateway-service.git
https://github.com/MartinGruter/auth-server-projekt2.git
https://github.com/MartinGruter/product-service-projekt2.git
https://github.com/MartinGruter/order-service-projekt2.git
https://github.com/MartinGruter/email-service-projekt2.git

### Hur applikationen startas

Node.js version krävs för att starta applikationen. Sedan kommandon i terminalen, första npm install sedan npm run dev, öppna sedan upp localhost://5173. Frontend behöver att gateway och övriga mikrötjänster körs.