<h1>webová aplikace vkine</h1>
<p>vkine je aplikace pro filmovou a seriálovou databázi TMDB, která Vám umožní vyhledávat filmy a seriály, zobrazovat jejich informace, hodnocení, trailery a ostatní média.</p>
<h2>Funkce</h2>
<ul>
	<li>Vyhledávání filmů a seriálů podle názvu, žánru, režiséra, herce, rok vydání atd.</li>
	<li>Zobrazení detailních informací o filmu nebo seriálu, včetně popisu, hodnocení, délky, hereckého obsazení, režiséra, žánru a dalších podrobností.</li>
	<li>Vytváření playlistů a sdílení s přáteli.</li>
	<li>Zobrazování nejnovějších filmů a seriálů v kině a na streamovacích službách.</li>
</ul>

<h2>Použité technologie</h2>
<ul>
	<li><a href="https://reactjs.org/">React</a></li>
    <li><a href="https://nextjs.org/">Next.js</a></li>
	<li><a href="https://nodejs.org/">Node.js</a></li>
	<li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://webpack.js.org/">Webpack</a></li>
</ul>

<h2>Doporučené požadavky</h2>
<ul>
	<li><strong>Node.js</strong> verze 25</li>
   <li><strong>npm</strong> verze 11.7 </br>Ověření instalace: <code>npm -v</code></li>
   <li><strong>Git</strong> verze 2.52 </br>Ověření instalace: <code>git --version</code></li>
</ul>

<h2>Doporučené prostředí</h2>
<ul> 
   <li>Operační systém: Windows 10/11, macOS, nebo Linux</li> 
   <li>Stabilní připojení k internetu (pro stažení balíčků)</li> 
</ul> 

<h2>TMDB API</h2>
<p>Pro správné fungování je nutné obdržet API klíč TMDB následujícím způsobem</p>
<ul> 
   <li>Založte si účet na <a href="https://www.themoviedb.org/signup">TMDB</a></li>
   <li>Pro získání klíče přejděte do <a href="https://www.themoviedb.org/settings/api">nastavení</a> a vygenerovat klíč</li> 
   <li>Klíč vložte do <code>.env</code> do proměnné <code>NEXT_PUBLIC_TMDB_API_KEY_VALUE</code> </li>
</ul> 

<h2>Instalace</h2>
<ol>
	<li>Stáhněte nebo naklonujte repozitář.</li>
	<li>V terminálu spusťte příkaz <code>npm ci</code> pro instalaci závislostí.</li>
	<li>Změňte příponu souboru .env.example na .env a doplňte údaje označené jako XXX (API klíč, ...)</li>
	<li>Vybuilděte aplikaci příkazem <code>npm run build</code></li>
	<li>Spusťte aplikaci příkazem <code>npm start</code> nebo pro dev <code>npm run dev</code></li>
	<li>Otevřete <a href="http://localhost:3000">http://localhost:3000</a> v prohlížeči.</li>
</ol>
