import React from 'react'
import TextArticle from '../../../components/article/TextArticle'

const privacyPolicy = () => {
  return (
    <TextArticle isBackgroundVisible={false} containerClass={"container"} innerContainerClass={"bg-dark mb-3 mt-5 p-4"}>
      <h2>Zásady ochrany osobních údajů</h2>
      <article>
        <h3>I. Základní ustanovení</h3>
        <ol>
          <li>Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů a o zrušení směrnice 95/46/ES (obecné nařízení o ochraně osobních údajů) (dále jen: „GDPR”) je Pavel Vaněček IČ 14430916 se sídlem Stožice 17, Vodňany 389 01 (dále jen: „správce“).</li>
          <li>
            Kontaktní údaje správce jsou
            <ul>
              <li>adresa: Stožice 17, Vodňany 389 01</li>
              <li>email: Vanecek0@seznam.cz</li>
              <li>telefon: +420 607 245 285</li>
            </ul>

          </li>
          <li>Osobními údaji se rozumí veškeré informace o identifikované nebo identifikovatelné fyzické osobě; identifikovatelnou fyzickou osobou je fyzická osoba, kterou lze přímo či nepřímo identifikovat, zejména odkazem na určitý identifikátor, například jméno, identifikační číslo, lokační údaje, síťový identifikátor nebo na jeden či více zvláštních prvků fyzické, fyziologické, genetické, psychické, ekonomické, kulturní nebo společenské identity této fyzické osoby.</li>
          <li>Správce nejmenoval pověřence pro ochranu osobních údajů.</li>
        </ol>
      </article>
      <article>
        <h3>II. Zdroje a kategorie zpracovávaných osobních údajů</h3>
        <ol>
          <li>Správce zpracovává osobní údaje, které jste mu poskytl/a nebo osobní údaje, které správce získal na základě Vaší registrace.</li>
          <li>Správce zpracovává Vaše identifikační a kontaktní údaje a údaje nezbytné pro plnění smlouvy.</li>
        </ol>
      </article>
      <article>
        <h3>III. Zákonný důvod a účel zpracování osobních údajů</h3>
        <ol>
          <li>
            Zákonným důvodem zpracování osobních údajů je
            <ul>
              <li>plnění smlouvy mezi Vámi a správcem podle čl. 6 odst. 1 písm. b) GDPR,</li>
              <li>oprávněný zájem správce na poskytování přímého marketingu (zejména pro zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. f) GDPR,</li>
              <li>Váš souhlas se zpracováním pro účely poskytování přímého marketingu (zejména pro zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. a) GDPR ve spojení s § 7 odst. 3 zákona č. 480/2004 Sb., o některých službách informační společnosti v případě, že nedošlo k objednávce zboží nebo služby. </li>
            </ul>
          </li>
          <li>Účelem zpracování osobních údajů je zasílání obchodních sdělení a činění dalších marketingových aktivit.</li>
          <li>Ze strany správce dochází k automatickému individuálnímu rozhodování ve smyslu čl. 22 GDPR. S takovým zpracováním jste poskytl/a svůj výslovný souhlas. </li>
        </ol>
      </article>
      <article>
        <h3>IV. Doba uchovávání údajů</h3>
        <ol>
          <li>Správce uchovává osobní údaje</li>
          <ul>
            <li>po dobu nezbytnou k výkonu práv a povinností vyplývajících ze smluvního vztahu mezi Vámi a správcem a uplatňování nároků z těchto smluvních vztahů (po dobu 15 let od ukončení smluvního vztahu).</li>
            <li>po dobu, než je odvolán souhlas se zpracováním osobních údajů pro účely marketingu, nejdéle 10 let, jsou-li osobní údaje zpracovávány na základě souhlasu.</li>
          </ul>
          <li>Po uplynutí doby uchovávání osobních údajů správce osobní údaje vymaže.</li>
        </ol>
      </article>
      <article>
        <h3>V. Příjemci osobních údajů (subdodavatelé správce)</h3>
        <ol>
          <li>
            Příjemci osobních údajů jsou osoby
            <ul>
              <li>podílející se na dodání zboží / služeb / realizaci plateb na základě smlouvy,</li>
              <li>podílející se na zajištění provozu služeb,</li>
              <li>zajišťující marketingové služby.</li>
            </ul>
          </li>
          <li>Správce má v úmyslu předat osobní údaje do třetí země (do země mimo EU) nebo mezinárodní organizaci. Příjemci osobních údajů ve třetích zemích jsou poskytovatelé mailingových služeb / cloudových služeb.</li>
        </ol>
      </article>
      <article>
        <h3>VI. Vaše práva</h3>
        <ol>
          <li>
            Za podmínek stanovených v GDPR máte
            <ul>
              <li>právo na přístup ke svým osobním údajům dle čl. 15 GDPR,</li>
              <li>právo opravu osobních údajů dle čl. 16 GDPR, popřípadě omezení zpracování dle čl. 18 GDPR.</li>
              <li>právo na výmaz osobních údajů dle čl. 17 GDPR.</li>
              <li>právo vznést námitku proti zpracování dle čl. 21 GDPR a</li>
              <li>právo na přenositelnost údajů dle čl. 20 GDPR. </li>
              <li>právo odvolat souhlas se zpracováním písemně nebo elektronicky na adresu nebo email správce uvedený v čl. III těchto podmínek.</li>
            </ul>
          </li>
          <li>Dále máte právo podat stížnost u Úřadu pro ochranu osobních údajů v případě, že se domníváte, že bylo porušeno Vaší právo na ochranu osobních údajů.</li>
        </ol>
      </article>
    </TextArticle>
  )
}

export default privacyPolicy