import express from "express";
import connectDB from "./connect.js";
import User from "./models/user.js";
import Question from "./models/questions.js";
import Reply from "./models/reply.js";
import cors from "cors";
import { Server } from "socket.io";
import bcrypt from 'bcrypt';


const app = express();
const PORT = process.env.PORT || 3000;
// const bcrypt = require('bcrypt');

const Airport = [
  {
    "iata": "UTK",
    "lon": "169.86667",
    "iso": "MH",
    "status": 1,
    "name": "Utirik Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "11.233333",
    "size": "small"
  },
  {
    "iata": "FIV",
    "iso": "US",
    "status": 1,
    "name": "Five Finger CG Heliport",
    "continent": "NA",
    "type": "heliport",
    "size": null
  },
  {
    "iata": "FAK",
    "iso": "US",
    "status": 1,
    "name": "False Island Seaplane Base",
    "continent": "NA",
    "type": "seaplanes",
    "size": null
  },
  {
    "iata": "BWS",
    "iso": "US",
    "status": 0,
    "name": "Blaine Municipal Airport",
    "continent": "NA",
    "type": "closed",
    "size": null
  },
  {
    "iata": "WKK",
    "lon": "-158.61111",
    "iso": "US",
    "status": 1,
    "name": "Aleknagik \/ New Airport",
    "continent": "NA",
    "type": "airport",
    "lat": "59.27778",
    "size": "medium"
  },
  {
    "iata": "TSS",
    "iso": "US",
    "status": 1,
    "name": "East 34th Street Heliport",
    "continent": "NA",
    "type": "heliport",
    "size": null
  },
  {
    "iata": "FOB",
    "lon": "-123.79444",
    "iso": "US",
    "status": 1,
    "name": "Fort Bragg Airport",
    "continent": "NA",
    "type": "airport",
    "lat": "39.474445",
    "size": "small"
  },
  {
    "iata": "ABP",
    "lon": "141.1",
    "iso": "PG",
    "status": 1,
    "name": "Atkamba Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-6.066667",
    "size": "small"
  },
  {
    "iata": "ALV",
    "iso": "AD",
    "status": 1,
    "name": "Andorra la Vella Heliport",
    "continent": "EU",
    "type": "heliport",
    "size": null
  },
  {
    "iata": "ADC",
    "lon": "145.73334",
    "iso": "PG",
    "status": 1,
    "name": "Andakombe Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-7.133333",
    "size": "small"
  },
  {
    "iata": "TJP",
    "lon": "-66.563545",
    "iso": "PR",
    "status": 1,
    "name": "Areopuerto Internacional Michael Gonzalez",
    "continent": "NA",
    "type": "airport",
    "lat": "18.010702",
    "size": "large"
  },
  {
    "iata": "AEE",
    "iso": "SS",
    "status": 1,
    "name": "Adareil Airport",
    "continent": "AF",
    "type": "airport",
    "size": "small"
  },
  {
    "iata": "AEI",
    "iso": "ES",
    "status": 1,
    "name": "Algeciras Heliport",
    "continent": "EU",
    "type": "heliport",
    "size": null
  },
  {
    "iata": "AEK",
    "lon": "146.28334",
    "iso": "PG",
    "status": 1,
    "name": "Aseki Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-7.366667",
    "size": "small"
  },
  {
    "iata": "OLR",
    "lon": "36.130333",
    "iso": "AF",
    "status": 1,
    "name": "Salerno Landing Zone Airport",
    "continent": "AS",
    "type": "airport",
    "lat": "34.023167",
    "size": "small"
  },
  {
    "iata": "AFR",
    "lon": "148.38333",
    "iso": "PG",
    "status": 1,
    "name": "Afore Airstrip",
    "continent": "OC",
    "type": "airport",
    "lat": "-9.133333",
    "size": "small"
  },
  {
    "iata": "AFT",
    "lon": "160.85",
    "iso": "SB",
    "status": 1,
    "name": "Afutara Aerodrome",
    "continent": "OC",
    "type": "airport",
    "lat": "-9.2",
    "size": "small"
  },
  {
    "iata": "ATD",
    "lon": "161.03334",
    "iso": "SB",
    "status": 1,
    "name": "Uru Harbour Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-8.866667",
    "size": "small"
  },
  {
    "iata": "VEV",
    "lon": "159.55",
    "iso": "SB",
    "status": 1,
    "name": "Barakoma Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-7.85",
    "size": "small"
  },
  {
    "iata": "GEF",
    "lon": "156.59778",
    "iso": "SB",
    "status": 1,
    "name": "Geva Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-7.578333",
    "size": "small"
  },
  {
    "iata": "AGG",
    "lon": "144.07388",
    "iso": "PG",
    "status": 1,
    "name": "Angoram Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-4.168611",
    "size": "small"
  },
  {
    "iata": "AKS",
    "lon": "160.68083",
    "iso": "SB",
    "status": 1,
    "name": "Auki Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-8.697778",
    "size": "small"
  },
  {
    "iata": "BAS",
    "lon": "155.88333",
    "iso": "SB",
    "status": 1,
    "name": "Ballalae Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-6.983333",
    "size": "small"
  },
  {
    "iata": "FRE",
    "lon": "159.58333",
    "iso": "SB",
    "status": 1,
    "name": "Fera\/Maringe Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-8.1",
    "size": "small"
  },
  {
    "iata": "HIR",
    "lon": "160.04819",
    "iso": "SB",
    "status": 1,
    "name": "Honiara International Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-9.428592",
    "size": "medium"
  },
  {
    "iata": "MBU",
    "lon": "160.75",
    "iso": "SB",
    "status": 1,
    "name": "Babanakira Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-9.733333",
    "size": "small"
  },
  {
    "iata": "IRA",
    "lon": "161.83333",
    "iso": "SB",
    "status": 1,
    "name": "Ngorangora Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-10.5",
    "size": "small"
  },
  {
    "iata": "SCZ",
    "lon": "166.85",
    "iso": "SB",
    "status": 1,
    "name": "Santa Cruz\/Graciosa Bay\/Luova Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-11.616667",
    "size": "small"
  },
  {
    "iata": "MUA",
    "lon": "157.26971",
    "iso": "SB",
    "status": 1,
    "name": "Munda Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-8.32794",
    "size": "medium"
  },
  {
    "iata": "GZO",
    "lon": "156.83333",
    "iso": "SB",
    "status": 1,
    "name": "Nusatupe Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-8.116667",
    "size": "small"
  },
  {
    "iata": "MNY",
    "lon": "155.56462",
    "iso": "SB",
    "status": 1,
    "name": "Mono Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-7.417428",
    "size": "small"
  },
  {
    "iata": "PRS",
    "lon": "158.0",
    "iso": "SB",
    "status": 1,
    "name": "Parasi Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-8.166667",
    "size": "small"
  },
  {
    "iata": "OTV",
    "iso": "SB",
    "status": 0,
    "name": "Ontong Java Atoll Airstrip",
    "continent": "OC",
    "type": "closed",
    "size": null
  },
  {
    "iata": "RNL",
    "lon": "160.3",
    "iso": "SB",
    "status": 1,
    "name": "Rennell\/Tingoa Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-11.666667",
    "size": "small"
  },
  {
    "iata": "EGM",
    "lon": "157.87506",
    "iso": "SB",
    "status": 1,
    "name": "Sege Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-8.577956",
    "size": "small"
  },
  {
    "iata": "RUS",
    "lon": "161.25",
    "iso": "SB",
    "status": 1,
    "name": "Marau Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-8.5",
    "size": "small"
  },
  {
    "iata": "VAO",
    "lon": "158.66667",
    "iso": "SB",
    "status": 1,
    "name": "Suavanao Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-7.566667",
    "size": "small"
  },
  {
    "iata": "AGK",
    "lon": "143.84666",
    "iso": "PG",
    "status": 1,
    "name": "Kagua Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-6.403333",
    "size": "small"
  },
  {
    "iata": "KGE",
    "lon": "157.5861",
    "iso": "SB",
    "status": 1,
    "name": "Kagau Island Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-8.165",
    "size": "small"
  },
  {
    "iata": "AGL",
    "lon": "149.15527",
    "iso": "PG",
    "status": 1,
    "name": "Wanigela Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-9.340278",
    "size": "small"
  },
  {
    "iata": "RIN",
    "lon": "157.03334",
    "iso": "SB",
    "status": 1,
    "name": "Ringi Cove Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-8.2",
    "size": "small"
  },
  {
    "iata": "RBV",
    "lon": "157.63945",
    "iso": "SB",
    "status": 1,
    "name": "Ramata Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-8.165556",
    "size": "small"
  },
  {
    "iata": "AHT",
    "iso": "US",
    "status": 0,
    "name": "Amchitka Army Airfield",
    "continent": "NA",
    "type": "closed",
    "size": null
  },
  {
    "iata": "AHY",
    "lon": "45.533333",
    "iso": "MG",
    "status": 1,
    "name": "Ambatolhy Airport",
    "continent": "AF",
    "type": "airport",
    "lat": "-20.016666",
    "size": "small"
  },
  {
    "iata": "AIE",
    "lon": "144.66667",
    "iso": "PG",
    "status": 1,
    "name": "Aiome Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-5.166667",
    "size": "small"
  },
  {
    "iata": "AIH",
    "lon": "141.26639",
    "iso": "PG",
    "status": 1,
    "name": "Aiambak Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-7.348611",
    "size": "small"
  },
  {
    "iata": "AIP",
    "lon": "168.81667",
    "iso": "MH",
    "status": 1,
    "name": "Ailinglaplap Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "7.266667",
    "size": "small"
  },
  {
    "iata": "AOS",
    "iso": "US",
    "status": 1,
    "name": "Amook Bay Seaplane Base",
    "continent": "NA",
    "type": "seaplanes",
    "size": null
  },
  {
    "iata": "AKM",
    "lon": "19.816668",
    "iso": "TD",
    "status": 1,
    "name": "Zakuoma Airport",
    "continent": "AF",
    "type": "airport",
    "lat": "10.883333",
    "size": "small"
  },
  {
    "iata": "ALZ",
    "iso": "US",
    "status": 1,
    "name": "Alitak Seaplane Base",
    "continent": "NA",
    "type": "seaplanes",
    "size": null
  },
  {
    "iata": "AMC",
    "lon": "20.283333",
    "iso": "MX",
    "status": 1,
    "name": null,
    "continent": "NA",
    "type": "airport",
    "lat": "11.033333",
    "size": "large"
  },
  {
    "iata": "AME",
    "lon": "37.583332",
    "iso": "MZ",
    "status": 1,
    "name": "Alto Molocue Airport",
    "continent": "AF",
    "type": "airport",
    "lat": "-15.833333",
    "size": "small"
  },
  {
    "iata": "AMF",
    "lon": "141.66667",
    "iso": "PG",
    "status": 1,
    "name": "AMA Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-4.166667",
    "size": "small"
  },
  {
    "iata": "AMU",
    "lon": "141.15",
    "iso": "PG",
    "status": 1,
    "name": "Amanab Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-3.516667",
    "size": "small"
  },
  {
    "iata": "AMY",
    "lon": "45.666668",
    "iso": "MG",
    "status": 1,
    "name": "Ambatomainty Airport",
    "continent": "AF",
    "type": "airport",
    "lat": "-17.683332",
    "size": "small"
  },
  {
    "iata": "ANH",
    "iso": "SB",
    "status": 0,
    "name": "Anuha Island Resort Airport",
    "continent": "OC",
    "type": "closed",
    "size": null
  },
  {
    "iata": "INU",
    "lon": "166.91667",
    "iso": "NR",
    "status": 1,
    "name": "Nauru International Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-0.533333",
    "size": "medium"
  },
  {
    "iata": "ANL",
    "lon": "17.25",
    "iso": "AO",
    "status": 1,
    "name": "Andulo Airport",
    "continent": "AF",
    "type": "airport",
    "lat": "-11.25",
    "size": "small"
  },
  {
    "iata": "CNZ",
    "lon": "19.0",
    "iso": "AO",
    "status": 1,
    "name": "Cangamba Airport",
    "continent": "AF",
    "type": "airport",
    "lat": "-11.5",
    "size": "small"
  },
  {
    "iata": "DRC",
    "lon": "20.7",
    "iso": "AO",
    "status": 1,
    "name": "Dirico Airport",
    "continent": "AF",
    "type": "airport",
    "lat": "-17.833332",
    "size": "small"
  },
  {
    "iata": "GGC",
    "lon": "22.566668",
    "iso": "AO",
    "status": 1,
    "name": "Lumbala Airport",
    "continent": "AF",
    "type": "airport",
    "lat": "-12.65",
    "size": "small"
  },
  {
    "iata": "JMB",
    "lon": "16.083332",
    "iso": "AO",
    "status": 1,
    "name": "Jamba Airport",
    "continent": "AF",
    "type": "airport",
    "lat": "-14.7",
    "size": "small"
  },
  {
    "iata": "KNP",
    "lon": "15.450278",
    "iso": "AO",
    "status": 1,
    "name": "Capanda Airport",
    "continent": "AF",
    "type": "airport",
    "lat": "-9.766944",
    "size": "small"
  },
  {
    "iata": "NDF",
    "lon": "14.833333",
    "iso": "AO",
    "status": 1,
    "name": "Ndalatandos Airport",
    "continent": "AF",
    "type": "airport",
    "lat": "-9.333333",
    "size": "small"
  },
  {
    "iata": "AOB",
    "lon": "144.65",
    "iso": "PG",
    "status": 1,
    "name": "Annanberg Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-4.916667",
    "size": "small"
  },
  {
    "iata": "APP",
    "lon": "148.13333",
    "iso": "PG",
    "status": 1,
    "name": "Asapa Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-8.983333",
    "size": "small"
  },
  {
    "iata": "APR",
    "lon": "145.0",
    "iso": "PG",
    "status": 1,
    "name": "April River Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-8.5",
    "size": "small"
  },
  {
    "iata": "AQY",
    "lon": "-149.11667",
    "iso": "US",
    "status": 1,
    "name": "Girdwood Airport",
    "continent": "NA",
    "type": "airport",
    "lat": "60.966667",
    "size": "small"
  },
  {
    "iata": "QRF",
    "lon": "-60.466667",
    "iso": "AR",
    "status": 1,
    "name": "Bragado Airport",
    "continent": "SA",
    "type": "airport",
    "lat": "-35.13333",
    "size": "small"
  },
  {
    "iata": "CSZ",
    "lon": "-61.88333",
    "iso": "AR",
    "status": 1,
    "name": "Brigadier Hector Ruiz Airport",
    "continent": "SA",
    "type": "airport",
    "lat": "-37.433334",
    "size": "small"
  },
  {
    "iata": "CVI",
    "lon": "-67.416664",
    "iso": "AR",
    "status": 1,
    "name": "Caleta Olivia Airport",
    "continent": "SA",
    "type": "airport",
    "lat": "-46.416668",
    "size": "small"
  },
  {
    "iata": "CNT",
    "lon": "-61.233334",
    "iso": "AR",
    "status": 1,
    "name": "Charata Airport",
    "continent": "SA",
    "type": "airport",
    "lat": "-27.216667",
    "size": "small"
  },
  {
    "iata": "VGS",
    "lon": "-63.0",
    "iso": "AR",
    "status": 1,
    "name": "General Villegas Airport",
    "continent": "SA",
    "type": "airport",
    "lat": "-35.083332",
    "size": "small"
  },
  {
    "iata": "LMD",
    "lon": "-68.13333",
    "iso": "AR",
    "status": 1,
    "name": "Los Menucos Airport",
    "continent": "SA",
    "type": "airport",
    "lat": "-40.833332",
    "size": "small"
  },
  {
    "iata": "SZQ",
    "iso": "AR",
    "status": 0,
    "name": null,
    "continent": "SA",
    "type": "closed",
    "size": null
  },
  {
    "iata": "VCF",
    "lon": "-66.15",
    "iso": "AR",
    "status": 1,
    "name": "Valcheta Airport",
    "continent": "SA",
    "type": "airport",
    "lat": "-40.7",
    "size": "small"
  },
  {
    "iata": "VME",
    "lon": "-65.416664",
    "iso": "AR",
    "status": 1,
    "name": "Villa Mercedes Airport",
    "continent": "SA",
    "type": "airport",
    "lat": "-33.63333",
    "size": "small"
  },
  {
    "iata": "NCJ",
    "iso": "AR",
    "status": 1,
    "name": "Sunchales Aeroclub Airport",
    "continent": "SA",
    "type": "airport",
    "size": "small"
  },
  {
    "iata": "CPG",
    "lon": "-62.979782",
    "iso": "AR",
    "status": 1,
    "name": "Carmen De Patagones Airport",
    "continent": "SA",
    "type": "airport",
    "lat": "-40.782757",
    "size": "small"
  },
  {
    "iata": "PRQ",
    "lon": "-60.666668",
    "iso": "AR",
    "status": 1,
    "name": "Termal Airport",
    "continent": "SA",
    "type": "airport",
    "lat": "-26.833332",
    "size": "small"
  },
  {
    "iata": "ARP",
    "lon": "149.5",
    "iso": "PG",
    "status": 1,
    "name": "Aragip Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-9.8",
    "size": "small"
  },
  {
    "iata": "TAV",
    "lon": "-169.45",
    "iso": "AS",
    "status": 1,
    "name": "Tau Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-14.25",
    "size": "small"
  },
  {
    "iata": "ASZ",
    "lon": "150.36667",
    "iso": "PG",
    "status": 1,
    "name": "Asirim Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-5.866667",
    "size": "small"
  },
  {
    "iata": "ATP",
    "lon": "142.28334",
    "iso": "PG",
    "status": 1,
    "name": "Aitape Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-3.166667",
    "size": "small"
  },
  {
    "iata": "AGW",
    "lon": "142.15",
    "iso": "AU",
    "status": 1,
    "name": "Agnew Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-12.15",
    "size": "small"
  },
  {
    "iata": "AYD",
    "lon": "135.95",
    "iso": "AU",
    "status": 1,
    "name": "Alroy Downs Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-19.3",
    "size": "small"
  },
  {
    "iata": "BCK",
    "lon": "144.16667",
    "iso": "AU",
    "status": 1,
    "name": "Bolwarra Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-17.4",
    "size": "small"
  },
  {
    "iata": "BFC",
    "lon": "145.33333",
    "iso": "AU",
    "status": 1,
    "name": "Bloomfield Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-15.9",
    "size": "small"
  },
  {
    "iata": "BVW",
    "lon": "143.21666",
    "iso": "AU",
    "status": 1,
    "name": "Batavia Downs Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-12.65",
    "size": "small"
  },
  {
    "iata": "BYX",
    "lon": "136.23334",
    "iso": "AU",
    "status": 1,
    "name": "Baniyala Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-13.2",
    "size": "small"
  },
  {
    "iata": "COB",
    "lon": "130.93333",
    "iso": "AU",
    "status": 1,
    "name": "Coolibah Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-15.55",
    "size": "small"
  },
  {
    "iata": "CQP",
    "lon": "147.5",
    "iso": "AU",
    "status": 1,
    "name": "Cape Flattery Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-18.2",
    "size": "small"
  },
  {
    "iata": "CRJ",
    "lon": "132.3",
    "iso": "AU",
    "status": 1,
    "name": "Coorabie Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-31.9",
    "size": "small"
  },
  {
    "iata": "CRY",
    "lon": "128.61667",
    "iso": "AU",
    "status": 1,
    "name": "Carlton Hill Airport",
    "continent": "OC",
    "type": "airport",
    "lat": "-15.466667",
    "size": "small"
  }
]

app.use(express.json());
app.use(cors({

    origin: "https://explore-mate-three.vercel.app",
    credentials: true,
  }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get('/tours', (req, res) => {
  res.json(tours);
});

// create a new user
app.post("/register", async (req, res) => {
  const { name, password, email, profileImage } = req.body;
  console.log("req.body", req.body);
  try {
      const findUser = await User.findOne({ name });
      if (findUser) {
          return res.status(400).json({ message: "Username already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      if (!password) return res.status(400).json({ message: "Password is required" });
      // Create the new user with the hashed password
      const newUser = await User.create({ name, password: hashedPassword, email, profileImage });
      return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
      res.status(500).json({ message: "Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
      const findUser = await User.findOne({ email });
      if (!findUser) {
          return res.status(400).json({ message: "User does not exist" });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Incorrect password" });
      }

      return res.status(200).json(findUser);
  } catch (error) {
      res.status(500).json({ message: "Server Error" });
  }
});


// add question
app.post("/ask-question", async (req, res) => {
  const { question, description, userId, tags } = req.body;
  try {
    const newQuestion = await Question.create({
      question,
      description,
      author: userId,
      tags,
    });
    return res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/answer/:id", async (req, res) => {
  const { answer, userId } = req.body;

  const { id: questionId } = req.params;
  try {
    const reply = await Reply.create({ reply: answer, author: userId });
    const findQuestion = await Question.findById(questionId);
    console.log("find", findQuestion);
    const addReply = await findQuestion.updateOne({
      $push: { replies: reply._id },
    });
    return res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


const deleteUser = async () => {
  try {
    const deleteQuestion = await Question.deleteMany({});
    const deleteReply = await Reply.deleteMany({});
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const server = app.listen(PORT, () => {
  connectDB();
  //deleteUser();
  console.log(`Server running on port ${PORT}`);
});

const io = new Server(server, {
  secure: true,
  cors: {
    origin: "https://explore-mate-three.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("socket connected");
  const users = [];

  for (let [id, socket] of io.of("/").sockets) {
    if (socket.handshake.auth._id)
      users.push({
        ...socket.handshake.auth,
        socketId: socket.handshake.auth._id,
      });
  }

  console.log("users", users);
  io.emit("user-connected", users);

  socket.on("join-room", ({ room, user }) => {
    users[user._id] = user;
    socket.join(room);
  });

  socket.on("send-message", ({ message, room, user }) => {
    console.log("message", message, room, user);
    io.to(room).emit("receive-message", { message, user, room });
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
    const delUser = users.filter(
      (user) => user.socketId !== socket.handshake.auth._id
    );
    console.log("disconnected users", delUser);
    io.emit("user-disconnected", delUser);
  });
});

export default app;
