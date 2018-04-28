const requestP = require('request-promise-native');
const { saveCityData } = require(`./database.js`);







let socrataODAUri = `https://odn.data.socrata.com/resource/`

let fbiUCRQueryStr = `$where=(name = 'Minneapolis, Minnesota' OR name = 'San Diego, California' OR name = 'Tampa, Florida' OR name = 'Sacramento, California' OR name = 'Cincinnati, Ohio' OR name = 'Kansas City, Kansas' OR name = 'Columbus, Ohio' OR name = 'Cleveland, Ohio' OR name = 'Indianapolis, Indiana' OR name = 'San Jose, California' OR name = 'Nashville, Tennessee' OR name = 'Virginia Beach, Virginia' OR name = 'Milwaukee, Wisconsin' OR name = 'Jacksonville, Florida' OR name = 'Austin, Texas' OR name = 'New York, New York' OR name = 'Los Angeles, California' OR name = 'Chicago, Illinois' OR name = 'Dallas, Texas' OR name = 'Houston, Texas' OR name = 'Washington, District of Columbia' OR name = 'Miami, Florida' OR name = 'Philadelphia, Pennsylvania' OR name = 'Atlanta, Georgia' OR name = 'Boston, Massachusetts' OR name = 'San Francisco, California' OR name = 'Phoenix, Arizona' OR name = 'Detroit, Michigan' OR name = 'Seattle, Washington' OR name = 'Denver, Colorado' OR name = 'Baltimore, Maryland' OR name = 'St. Louis, Missouri' OR name = 'Orlando, Florida' OR name = 'San Antonio, Texas' OR name = 'Pittsburgh, Pennsylvania' OR name = 'Portland, Oregon' OR name = 'Riverside, California') AND crime_type = 'Violent crime'`;

let fbiUCRUri = `rtec-wkeg.json`;

let costOfLivingQueryStr = (year, category, rankType) => `$where=(name = 'Minneapolis-St. Paul-Bloomington, MN-WI Metro Area' OR name = 'San Diego-Carlsbad, CA Metro Area' OR name = 'Tampa-St. Petersburg-Clearwater, FL Metro Area' OR name = 'Sacramento--Roseville--Arden-Arcade, CA Metro Area' OR name = 'Cincinnati, OH-KY-IN Metro Area' OR name= 'Kansas City, MO-KS Metro Area' OR name = 'Columbus, OH Metro Area' OR name = 'Cleveland-Elyria, OH Metro Area' OR name = 'Indianapolis-Carmel-Anderson, IN Metro Area' OR name = 'San Jose-Sunnyvale-Santa Clara, CA Metro Area' OR name = 'Nashville-Davidson--Murfreesboro--Franklin, TN Metro Area' OR name = 'Virginia Beach-Norfolk-Newport News, VA-NC Metro Area' OR name = 'Milwaukee-Waukesha-West Allis, WI Metro Area' OR name = 'Jacksonville, FL Metro Area' OR name = 'Austin-Round Rock, TX Metro Area' OR name = 'New York-Newark-Jersey City, NY-NJ-PA Metro Area' OR name = 'Los Angeles-Long Beach-Anaheim, CA Metro Area' OR name = 'Chicago-Naperville-Elgin, IL-IN-WI Metro Area' OR name = 'Dallas-Fort Worth-Arlington, TX Metro Area' OR name = 'Houston-The Woodlands-Sugar Land, TX Metro Area' OR name = 'Washington-Arlington-Alexandria, DC-VA-MD-WV Metro Area' OR name = 'Miami-Fort Lauderdale-West Palm Beach, FL Metro Area' OR name = 'Philadelphia-Camden-Wilmington, PA-NJ-DE-MD Metro Area' OR name = 'Atlanta-Sandy Springs-Roswell, GA Metro Area' OR name = 'Boston-Cambridge-Newton, MA-NH Metro Area' OR name = 'San Francisco-Oakland-Hayward, CA Metro Area' OR name = 'Phoenix-Mesa-Scottsdale, AZ Metro Area' OR name = 'Detroit-Warren-Dearborn, MI Metro Area' OR name = 'Seattle-Tacoma-Bellevue, WA Metro Area' OR name = 'Denver-Aurora-Lakewood, CO Metro Area' OR name = 'Baltimore-Columbia-Towson, MD Metro Area' OR name = 'St. Louis, MO-IL Metro Area' OR name = 'Orlando-Kissimmee-Sanford, FL Metro Area' OR name = 'San Antonio-New Braunfels, TX Metro Area' OR name = 'Pittsburgh, PA Metro Area' OR name = 'Portland-Vancouver-Hillsboro, OR-WA Metro Area' OR name = 'Riverside-San Bernardino-Ontario, CA Metro Area') AND year > ${year} AND component = '${category}' AND variable = '${rankType}' AND type = 'metro'`

let costOfLivingUri = `t64z-nedn.json`;



requestP.get(socrataODAUri + fbiUCRUri + `?` + fbiUCRQueryStr, { json: true })
  .then((crimeData) => {
    // console.log(`fbi UCR payload returned: ${crimeData}`);

    let cityData = crimeData.reduce((cities, record) => {
      let { name, year, crime_rate, crime_count } = record;

      cities.push({
        city_name_unAbrev: name,
        violent_crime_data: {
          crime_rate: parseFloat(crime_rate),
          crime_count: parseInt(crime_count),
          year: year
        }
      });

      return cities;
    }, []);

    requestP.get(socrataODAUri + costOfLivingUri + `?` + costOfLivingQueryStr(2010, 'all', 'rank'), { json: true })
      .then((costData) => {
        // console.log(`cost of living payload returned: ${costData}`);
        let cityNames = cityData.map((city) => {
          let nameArr = city.city_name_unAbrev.split(',');

          let nameContains = nameArr[0]
          if (nameContains === 'East' || nameContains === 'North' || nameContains === 'West' || nameContains === 'South') {
            nameContains = nameArr[1]
          }

          return nameContains;
        });

        costData.forEach((record) => {
          cityNames.forEach((name, idx) => {
            if (record.name.includes(name)) {
              cityData[idx].city_name_long = record.name;
              if (!cityData[idx].cost_of_living_rank) {
                cityData[idx].cost_of_living_rank = [];
              }
              cityData[idx].cost_of_living_rank.push({ year: record.year, rank: parseInt(record.value)});
            }
          })
        });
        
        
        
        requestP.get(socrataODAUri + costOfLivingUri + `?` + costOfLivingQueryStr(2010, 'all', 'index'), { json: true })
        .then((costData) => {
          
          costData.forEach((record) => {
            cityData.forEach((city, idx) => {
              if(record.name === city.city_name_long) {
                if (!cityData[idx].cost_of_living_index) {
                  cityData[idx].cost_of_living_index = [];
                  console.log('creating cost of living index prop for ', record.name);
                }
                cityData[idx].cost_of_living_index.push({ year: record.year, index: parseFloat(record.value) });
              }
            })

            console.log(JSON.stringify(cityData));

          })
          
          saveCityData(cityData);
          
          
          })
      });

  });



// Schema- city data:::
// city_name_long: {
//   type: String,
//   unique: true
// },
// city_name_unAbrev: String,
// cost_of_living_rank: Object,
// cost_of_living_index: Object,
// cost_of_rent_rank: Object,
// cost_of_rent_index: Object,
// cost_of_other_rank: Object,
// cost_of_other_index: Object,
// violent_crime_data: Object
