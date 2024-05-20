import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  realestateservices = [
    { name: 'Agent Imobiliar', person: 'Nicolae Leva', phone: '206-566-9343', email: "nicolae.leva@206realty.com", website: "www.nicolaeleva.com", description : "Agent Imobiliar/Real Estate Broker" },
    { name: 'Agent Imobiliar', person: 'Gabriel Albut', phone: '206-484-9410', email: "albutlazea@yahoo.com", website: "www.gabrielal.johnlscott.com", description : "Agent Imobiliar/Real Estate Broker" },
    { name: 'Agent Imobiliar', person: 'Ioana Constantin', phone: '425 281 3934', email: "ioana@macyandco.com", website: "https://www.facebook.com/iconstantinrealty/", description : "We ofer the best service in town" },
    { name: 'Agent Imobiliar', person: 'Lilia Petica', phone: '206-915-1341' , email: "liliap@windermere.com", website: "liliapetica.withwre.com", description : "We ofer the best service in town"},
    { name: 'Agent Imobiliar', person: 'Ghiurau Sergiu', phone: '206-834-5341' , email: "sergiu@KW.com", website: "https://www.facebook.com/Sergiu-Real-Estate-Broker-127688671122818/", description : "We ofer the best service in town"},
    { name: 'Agent Imobiliar', person: 'Nadia Schmieder', phone: '425 677 4734', email: "nadia@macyandco.com", website: "www.johnsservice.com", description : "Nadia Real Estate (Facebook)" },
    { name: 'Agent Imobiliar', person: 'Vasi Nemes Jr', phone: '206-229-0390', email: "vnemes@206realty.com", website: "www.206realty.com", description : "We ofer the best service in town" },
    { name: 'Agent Imobiliar', person: 'Sergey Oleynikov', phone: '206-909-6295' , email: "CONTACT@SERGEYOLEYNIKOV.COM", website: "www.sergeyoleynikov.com", description : "We ofer the best service in town"},
    { name: 'Agent Imobiliar', person: 'Anne Mehedinti', phone: '425-243-7494' , email: "bellevuewabroker@gmail.com", website: "www.annemehedinti.com", description : "We ofer the best service in town"}
  ];

  notaryservices = [
    { name: 'Notar Public', person: 'Nicolae Leva', phone: '206-566-9343', email: "leva.nicolae@gmail.com", website: "www.nicolaeleva.com", description : "Notar Public" },
    { name: 'Notar Public', person: 'Vladimir Popescu', phone: '253-632-2817', email: "vladimir_popescu@yahoo.com", website: "", description : "Notar Public" },
    { name: 'Notar Public', person: 'Daniela Ypersiel', phone: '253-455-8582', email: "cvltranslation@gmail.com", website: "", description : "Notar Public" },
    { name: 'Notar Public', person: 'Cristina Moldovan', phone: '1-866-928-6404' , email: "cristina@traduterra.com", website: "lwww.traduterra.com", description : "Notar Public"},
    { name: 'Notar Public', person: 'Ionela Popescu', phone: '425-773-8751' , email: "usionelapopescu@yahoo.com", website: "www.romanica-translations.com", description : "Notar Public"},

  ];

  translationservices = [
    { name: 'Traducator autorizat', person: 'Daniela Ypersiel', phone: '253-455-8582', email: "cvltranslation@gmail.com", website: "", description : "Traducator" },
    { name: 'Traducator autorizat',person: 'Cristina Moldovan', phone: '1-866-928-6404' , email: "cristina@traduterra.com", website: "lwww.traduterra.com", description : "Traducator"},
    { name: 'Traducator autorizat', person: 'Ionela Popescu', phone: '425-773-8751' , email: "usionelapopescu@yahoo.com", website: "www.romanica-translations.com", description : "Traducator"},


  ];

  constructor() { }

  ngOnInit(): void { }
}


// "Medicina Integrativa si Functionala, Naturopatie",Camelia Ades,206-888-2121,info@holistichealthseattle.com,www.AIMforGreatHealth.com
// Dentist ,Dr. Antonela Polotanu (My Dentist Seattle),425-277-7592,, http://www.mydentistseattle.com/
// Dentist ,Dr. Alexandra Cristescu(Eastside Family Dentistry),425-276-7367
// Ortodont / Orthodontist,Dr. Fedora Katz (Silver Lake Orthodontics-Everett),425-278-4400,info@silverlakebraces.com,www.silverlakebraces.com,

// Transport ,Aurelian(Far Away Land Inc ),503-762-2390
// Transport ,Adrian (Newcastle),,,http://www.fb.com/Seattle2Europe
// Transport ,Vio Berari,206-919-1297,,http://www.shiptoromania.org/,




// Avocat,Robert Radulescu,206-799-6472,robert@robertradulescu.com,Emigrari in WA si Cazuri civile in California,,,,,,,,,,,,,,,,
// Avocat,"Cristina Mehling, Mehling Law Firm ",425-990-1046,cm@mehlinglawfirm.com,mehlinglawfirm.com,,,,,,,,,,,,,,,,
// Avocat (personal injury/accidente/malpraxis medical),Mihnea Andrei Andreescu,860-796-7552,andreescu_mihnea97@yahoo.com,https://buckleylaw.net/,8am - 6 pm,,,,,,,,,,,,,,,
// Avocat (personal injury and estate planning),Cosmin Popa,425-750-2061,cosmin@popalaw.com,www.popalaw.com,9am-5pm,,,,,,,,,,,,,,,
// Avocat emigrari,Octavian Jumanca,425-770-2550,octavian@westlakelaw.net,,,,,,,,,,,,,,,,,
// Avocat emigrari,Ruxandra Dragan,425-449-5700,ruxandra@dragn-law.com,,,,,,,,,,,,,,,,,

// Mancare (mici),Lucian Breban,206-799-5941,,,,,,,,,,,,,,,,,,
// Podele laminate,Sorin Draghici (Alpha Pro Services),206-227-9704,,,,,,,,,,,,,,,,,,
// Oncologist veterinar,"Luminita Sarbu, PhD, DVM, ACVIM (Oncology)",425-242-7005,info@helpingpetswithcancer.com,www.helpingpetswithcancer.com,,,,,,,,,,,,,,,,
// Cosmetician,Pusa Ichim ,425-485-5749,,http://erikazhairdesign.com/,,,,,,,,,,,,,,,,
// CNA/ caregiver with all certifications and current licence,Emilia Gherman,425-922-4289,emiliag811@gmail.com,,,,,,,,,,,,,,,,,
// Catering ,Alfred Vararu (Freddy),425-301-5736,alfredvararu@yahoo.com,Ca la mama (Facebook),,,,,,,,,,,,,,,,
// Wedding flowers and design,Salomeia Marta (Sally),425-623-8233,coutureblossoms@gmail.com,coutureblossoms.com,,,,,,,,,,,,,,,,
// "Acupunctura, Masaj de relaxare, Sound healing",Ioana Todoran,206-331-0951,office@acupuncture-5e.com,https://www.acupuncture-5e.com/,,,,,,,,,,,,,,,,

// Website developer ,Alex Pop,410-600-5271,al2code@gmail.com,,,,,,,,,,,,,,,,,
// "Grafica (logo, carti de vizita, afise, flyere, website, modificari foto, tricouri) si mentenanta PC  software (devirusare, instalare programe, drivere, imprimante, wi-fi, rutere, ..etc)",Avocat,425-681-9201,contact@visualpd.com,www.visualpd.com,,,,,,,,,,,,,,,,
// Photography & Videography,Marius Blidar,425-268-6622,contact@mariusphoto.com,www.mariusphoto.com,,,,,,,,,,,,,,,,
// Personal Training/Nutrition,Ana Burns,425-931-4292,anaburns@me.com,www.fitnesswithana.com,,,,,,,,,,,,,,,,
// Fotograf Imobiliare / Portrete,Alex Bucse,425 390 4204,monkifoto@gmail.com,https://www.monkifoto.com / https://www.seattlerealestatephoto.com/,,,,,,,,,,,,,,,,
// Terapeut ABA,Tatiana Chihai Turcanu,425-215-9740,tturcanu@gmail.com,,,,,,,,,,,,,,,,,
// Flooring  and tile,Bogdan Goia,206-353-0210,bogdan98031@gmail.com ,www.proflooringllc.org,,,,,,,,,,,,,,,,
// "Agentie de Turism, Bilete de avion ",Alex Tanasescu ,206-790-3135,info4me@astinternational.com,www.astinternational.com,,,,,,,,,,,,,,,,
// Photography - Videography - Graphic Design - Website Creator ... and more,Tiberio Serbanescu,360-890-9734,tiberio.photography@hotmail.com,tiberiophotography.com,,etsy.com/shop/pnwartproductions,,,,,,,,,,,,,,
// Software for Adult Family Homes,Claudiu (Claud) Covaci,360-713-7860,claud@synkwise.com,synkwise.com,,,,,,,,,,,,,,,,
// Mortgage Loan Officer,Laura Oleynikov,206-673-1438,laura@tristarfinance.com,www.tristarfinance.com,oricand :),,,,,,,,,,,,,,,
// Masaj therapy,Gabriela Talaba,425-263-0531,readyformassage@gmail.com,,,,,,,,,,,,,,,,,
// Plumbing Contractor,Sorin Mehedinti,425-395-4034,americanqualitywa@gmail.com,www.americanqualityplumbing.com,,,,,,,,,,,,,,,,
// Mortgage Loan Officer,Cristian Toaca,425-999-9044,cristian@hometrustloans.com,www.cristiantoaca.com,7 zile pe saptamina ,,,,,,,,,,,,,,,
// Livrari colete (toata Europa - inclusiv Ro/Md),Adrian,www.fb.com/Seattle2Europe,,,,,,,,,,,,,,,,,,
// Taxe CPA ,Anca Pop,(425) 444-9122,,https://www.aeppllc.com/about-us/meet-the-founder,,,,,,,,,,,,,,,,
// Vin Românesc Premium,Teodora Baba,509-570-3094,teodora@teinnovadora.com,www.teinnovadora.com,,,,,,,,,,,,,,,,
// "Cozonaci, prăjituri, mancare",Florentina Mihai,425-295-9922,https://www.facebook.com/profile.php?id=100010798932084&mibextid=ZbWKwL,,,,,,,,,,,,,,,,,
// Cleaning Services,Olga Gherghel,206-750-1101,office@purelightgreen.com,https://www.purelightgreen.com/,,,,,,,,,,,,,,,,
// Personal Training /Zoom classes/Nutrition ,Andreea Marinescu,775-350-8745,andreea.marinescu91@gmail.com,https://fitnesswithandreea.com/,,,,,,,,,,,,,,,,
// Produse de panificație din Maia naturală și cofetărie ,Cristina Turcan,(425)354-7785,cristina.turcan56@gmail.com,,,,,,,,,,,,,,,,,
