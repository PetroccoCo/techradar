//This is the title for your window tab, and your Radar
document.title = "Pete's Technology Radar";


//This is the concentic circles that want on your radar
var radar_arcs = [
                   {'r':100,'name':'Adopt'},
                   {'r':200,'name':'Trial'},
                   {'r':300,'name':'Assess'},
                   {'r':400,'name':'Hold'}
                 ];
// take the largest ring's radius, multiply by two to get diameter
// then add the smallest ring's radius as a buffer
radar_arcs.sort(function (a,b){return a.r-b.r;});
var largest_ring = radar_arcs[radar_arcs.length-1];
svg_width = (largest_ring.r*2) + radar_arcs[0].r;
svg_height = svg_width; // we have a circle here...

//This is your raw data
//
// Key
//
// movement:
//   t = moved
//   c = stayed put
//
// blipSize: 
//  intValue; This is optional, if you omit this property, then your blip will be size 70.
//            This give you the ability to be able to indicate information by blip size too
//
// url:
// StringValue : This is optional, If you add it then your blips will be clickable to some URL
//
// pc: polar coordinates
//   r = distance away from origin ("radial coordinate")
//     - Each level is 100 points away from origin
//     t = angle of the point from origin ("angular coordinate")
//     - 0 degrees is due east
//
// Coarse-grained quadrants
// - Techniques: elements of a software development process, such as experience design; and ways of structuring software, such micro-services.
                 // 90 - 180
// - Tools: components, such as databases, software development tools, such as versions control systems; or more generic categories of tools, such as the notion of polyglot persistance.
                 // 0 - 90
// - Platforms: things that we build software on top of: mobile technologies like Android, virtual platforms like the JVM, or generic kinds of platforms like hybrid clouds
                 // 180 - 270
// - Programming Languages and Frameworks
                 // 270 - 360
//
// Rings:
// - Adopt: blips you should be using now; proven and mature for use
// - Trial: blips ready for use, but not as completely proven as those in the adopt ring; use on a trial basis, to decide whether they should be part of your toolkit
// - Assess: things that you should look at closely, but not necessarily trial yet - unless you think they would be a particularly good fit for you
// - Hold: things that are getting attention in the industry, but not ready for use; sometimes they are not mature enough yet, sometimes they are irredeemably flawed
//      Note: there's no "avoid" ring, but throw things in the hold ring that people shouldn't use.

var radar_data_old = [
    { "sector": "Techniques",
      "color" : "#8FA227",
      "degrees_min" : 90,
      "degrees_max" : 180,
        "items" : [
            { "name": "DevOps",                                            "pc": { "r": 117, "t": 94},  "movement": "c"},
            { "name": "Real world testing of mobile networks",             "pc": { "r": 341, "t": 110}, "movement": "c"},
            { "name": "Build pipelines",                                   "pc": { "r": 341, "t": 116}, "movement": "c"},
            { "name": "Development Environments in the cloud",             "pc": { "r": 295, "t": 128}, "movement": "c"},
            { "name": "Analytics and data science",                        "pc": { "r": 275, "t": 128}, "movement": "t"},
            { "name": "Mobile first",                                      "pc": { "r": 167, "t": 129}, "movement": "c"},
            { "name": "Web as platform",                                   "pc": { "r": 109, "t": 140}, "movement": "c"},
            { "name": "Continuous delivery for mobile devices",            "pc": { "r": 138, "t": 141}, "movement": "c"},
            { "name": "Standardize machine and application configuration", "pc": { "r": 385, "t": 150}, "movement": "c"},
            { "name": "Perimeterless enterprise",                          "pc": { "r": 327, "t": 156}, "movement": "c"},
            { "name": "Optimize test order",                               "pc": { "r": 244, "t": 156}, "movement": "c"},
            { "name": "Blue-green deployment",                             "pc": { "r": 214, "t": 160}, "movement": "c"},
            { "name": "Capture client side javascript errors",             "pc": { "r": 133, "t": 160}, "movement": "c"},
            { "name": "Logs as data, better logging",                      "pc": { "r": 275, "t": 174}, "movement": "c"},
            { "name": "Infrastructure automation",                         "pc": { "r": 84,  "t": 175}, "movement": "c"}
        ]
    },
    { "sector": "Tools",
      "color" : "#587486",
      "degrees_min" : 0,
      "degrees_max" : 90,
        "items" : [
            { "name": "Gradle",                              "pc": { "r": 75,  "t": 4},  "movement": "c"},
            { "name": "Puppet",                              "pc": { "r": 265, "t": 5},  "movement": "c"},
            { "name": "Jekyll",                              "pc": { "r": 216, "t": 12}, "movement": "c"},
            { "name": "Github",                              "pc": { "r": 156, "t": 15}, "movement": "c"},
            { "name": "Next gen test tools",                 "pc": { "r": 84,  "t": 18}, "movement": "c"},
            { "name": "Puppet, Chef, and Octopus",           "pc": { "r": 323, "t": 23}, "movement": "c"},
            { "name": "Frank",                               "pc": { "r": 31,  "t": 26}, "movement": "c"},
            { "name": "Cross mobile platforms",              "pc": { "r": 365, "t": 27}, "movement": "c"},
            { "name": "Embeded servlet containers",          "pc": { "r": 152, "t": 33}, "movement": "c"},
            { "name": "Graphite",                            "pc": { "r": 109, "t": 34}, "movement": "c"},
            { "name": "Intentional Programming",             "pc": { "r": 93,  "t": 38}, "movement": "c"},
            { "name": "NoSQL",                               "pc": { "r": 203, "t": 45}, "movement": "c"},
            { "name": "Logstash and Graylog2",               "pc": { "r": 287, "t": 49}, "movement": "c"},
            { "name": "Apache Pig",                          "pc": { "r": 276, "t": 50}, "movement": "c"},
            { "name": "Locust",                              "pc": { "r": 172, "t": 56}, "movement": "c"},
            { "name": "NuGet and Chocolatey NuGet",          "pc": { "r": 140, "t": 64}, "movement": "c"},
            { "name": "Git",                                 "pc": { "r": 324, "t": 74}, "movement": "c"},
            { "name": "Message busses without smarts",       "pc": { "r": 145, "t": 75}, "movement": "c"},
            { "name": "D3",                                  "pc": { "r": 128, "t": 75}, "movement": "c"},
            { "name": "Puppet-librarian and Chef-librarian", "pc": { "r": 98,  "t": 78}, "movement": "c"},
            { "name": "TestFlight",                          "pc": { "r": 133, "t": 79}, "movement": "c"},
            { "name": "Gatling",                             "pc": { "r": 288, "t": 79}, "movement": "c"},
            { "name": "WebFonts and SVG",                    "pc": { "r": 228, "t": 84}, "movement": "c"}
        ]
    },
    { "sector": "Platforms",
      "color" : "#DC6F1D",
      "degrees_min" : 180,
      "degrees_max" : 270,
        "items" : [
            { "name": "EC2 & S3",                                     "pc": { "r": 103, "t": 181}, "movement": "c"},
            { "name": "Google as corporate platform",                 "pc": { "r": 51,  "t": 194}, "movement": "c"},
            { "name": "Location based services",                      "pc": { "r": 125, "t": 197}, "movement": "c"},
            { "name": "Node.js",                                      "pc": { "r": 315, "t": 198}, "movement": "c"},
            { "name": "iPhone",                                       "pc": { "r": 259, "t": 205}, "movement": "c"},
            { "name": "Mobile Web",                                   "pc": { "r": 127, "t": 207}, "movement": "t"},
            { "name": "NoSQL using PostgreSQL, MongoDB",              "pc": { "r": 280, "t": 210}, "movement": "c"},
            { "name": "iPad",                                         "pc": { "r": 181, "t": 211}, "movement": "c"},
            { "name": "JVM as platform",                              "pc": { "r": 23,  "t": 211}, "movement": "c"},
            { "name": "Windows 8.1 Metro mode",                       "pc": { "r": 388, "t": 212}, "movement": "c"},
            { "name": "Android",                                      "pc": { "r": 257, "t": 215}, "movement": "c"},
            { "name": "SMS and USSD, feature phones",                 "pc": { "r": 107, "t": 230}, "movement": "c"},
            { "name": "Vumi",                                         "pc": { "r": 234, "t": 234}, "movement": "c"},
            { "name": "Wearable tech",                                "pc": { "r": 202, "t": 244}, "movement": "c"},
            { "name": "Chromecast",                                   "pc": { "r": 252, "t": 247}, "movement": "c"},
            { "name": "PhantomJS",                                    "pc": { "r": 10,  "t": 248}, "movement": "c"},
            { "name": "Rich internet applications",                   "pc": { "r": 198, "t": 250}, "movement": "c"},
            { "name": "Living room technology, Xbox, PS4, Smart tvs", "pc": { "r": 210, "t": 254}, "movement": "c"},
            { "name": "OAuth",                                        "pc": { "r": 284, "t": 268}, "movement": "t"}
        ]
    },
    { "sector": "Languages",
      "color" : "#B70062",
      "degrees_min" : 270,
      "degrees_max" : 360,
        "items" : [
            { "name": "Ruby",                               "pc": { "r": 67,  "t": 272}, "movement": "c"},
            { "name": "Groovy",                             "pc": { "r": 317, "t": 273}, "movement": "c"},
            { "name": "CSS Frameworks",                     "pc": { "r": 383, "t": 278}, "movement": "c"},
            { "name": "Jasmine and Node.JS",                "pc": { "r": 209, "t": 294}, "movement": "c"},
            { "name": "CoffeeScript",                       "pc": { "r": 227, "t": 295}, "movement": "c"},
            { "name": "Scala",                              "pc": { "r": 74,  "t": 296}, "movement": "c"},
            { "name": "Sinatra",                            "pc": { "r": 367, "t": 308}, "movement": "c"},
            { "name": "Javascript as a 1st class language", "pc": { "r": 244, "t": 309}, "movement": "c"},
            { "name": "DSLs",                               "pc": { "r": 252, "t": 315}, "movement": "c"},
            { "name": "Clojure",                            "pc": { "r": 191, "t": 316}, "movement": "c"},
            { "name": "Backbone.js",                        "pc": { "r": 57,  "t": 320}, "movement": "c"},
            { "name": "HTML 5",                             "pc": { "r": 99,  "t": 326}, "movement": "c"},
            { "name": "Twitter Bootstrap",                  "pc": { "r": 184, "t": 339}, "movement": "c"},
            { "name": "Require.js",                         "pc": { "r": 258, "t": 345}, "movement": "c"}
        ]
    }
];

var radar_data = [{"sector":"Techniques","color":"#8FA227","degrees_min":90,"degrees_max":180,"items":[{"name":"Web as platform","desc":"No description available","pc":{"r":63,"t":97},"movement":"c","blipSize":10},{"name":"Infrastructure automation","desc":"No description available","pc":{"r":86,"t":96},"movement":"c","blipSize":10},{"name":"DevOps","desc":"No description available","pc":{"r":117,"t":94},"movement":"c","blipSize":10},{"name":"Continuous delivery for mobile devices","desc":"No description available","pc":{"r":142,"t":93},"movement":"c","blipSize":10},{"name":"Mobile first","desc":"No description available","pc":{"r":165,"t":94},"movement":"c","blipSize":10},{"name":"Capture client side javascript errors","desc":"No description available","pc":{"r":190,"t":93},"movement":"c","blipSize":10},{"name":"Blue-green deployment","desc":"No description available","pc":{"r":215,"t":94},"movement":"c","blipSize":10},{"name":"Optimize test order","desc":"No description available","pc":{"r":244,"t":156},"movement":"c","blipSize":10},{"name":"Analytics and data science","desc":"No description available","pc":{"r":275,"t":128},"movement":"t","blipSize":10},{"name":"Logs as data, better logging","desc":"No description available","pc":{"r":275,"t":174},"movement":"c","blipSize":10},{"name":"Development Environments in the cloud","desc":"No description available","pc":{"r":295,"t":128},"movement":"c","blipSize":10},{"name":"Perimeterless enterprise","desc":"No description available","pc":{"r":327,"t":156},"movement":"c","blipSize":10},{"name":"Real world testing of mobile networks","desc":"No description available","pc":{"r":341,"t":110},"movement":"c","blipSize":10},{"name":"Build pipelines","desc":"No description available","pc":{"r":341,"t":116},"movement":"c","blipSize":10},{"name":"Standardize machine and application configuration","desc":"No description available","pc":{"r":385,"t":150},"movement":"c","blipSize":10}]},{"sector":"Tools","color":"#587486","degrees_min":0,"degrees_max":90,"items":[{"name":"Frank","desc":"No description available","pc":{"r":31,"t":26},"movement":"c","blipSize":10},{"name":"Gradle","desc":"No description available","pc":{"r":75,"t":4},"movement":"c","blipSize":10},{"name":"Next gen test tools","desc":"No description available","pc":{"r":84,"t":18},"movement":"c","blipSize":10},{"name":"Intentional Programming","desc":"No description available","pc":{"r":93,"t":38},"movement":"c","blipSize":10},{"name":"Puppet-librarian and Chef-librarian","desc":"No description available","pc":{"r":98,"t":78},"movement":"c","blipSize":10},{"name":"Graphite","desc":"No description available","pc":{"r":109,"t":34},"movement":"c","blipSize":10},{"name":"D3","desc":"No description available","pc":{"r":128,"t":75},"movement":"c","blipSize":10},{"name":"TestFlight","desc":"No description available","pc":{"r":133,"t":79},"movement":"c","blipSize":10},{"name":"NuGet and Chocolatey NuGet","desc":"No description available","pc":{"r":140,"t":64},"movement":"c","blipSize":10},{"name":"Message busses without smarts","desc":"No description available","pc":{"r":145,"t":75},"movement":"c","blipSize":10},{"name":"Embeded servlet containers","desc":"No description available","pc":{"r":152,"t":33},"movement":"c","blipSize":10},{"name":"Github","desc":"No description available","pc":{"r":156,"t":15},"movement":"c","blipSize":10},{"name":"Locust","desc":"No description available","pc":{"r":172,"t":56},"movement":"c","blipSize":10},{"name":"NoSQL","desc":"No description available","pc":{"r":203,"t":45},"movement":"c","blipSize":10},{"name":"Jekyll","desc":"No description available","pc":{"r":216,"t":12},"movement":"c","blipSize":10},{"name":"WebFonts and SVG","desc":"No description available","pc":{"r":228,"t":84},"movement":"c","blipSize":10},{"name":"Puppet","desc":"No description available","pc":{"r":265,"t":5},"movement":"c","blipSize":10},{"name":"Apache Pig","desc":"No description available","pc":{"r":276,"t":50},"movement":"c","blipSize":10},{"name":"Logstash and Graylog2","desc":"No description available","pc":{"r":287,"t":49},"movement":"c","blipSize":10},{"name":"Gatling","desc":"No description available","pc":{"r":288,"t":79},"movement":"c","blipSize":10},{"name":"Puppet, Chef, and Octopus","desc":"No description available","pc":{"r":323,"t":23},"movement":"c","blipSize":10},{"name":"Git","desc":"No description available","pc":{"r":324,"t":74},"movement":"c","blipSize":10},{"name":"Cross mobile platforms","desc":"No description available","pc":{"r":365,"t":27},"movement":"c","blipSize":10}]},{"sector":"Platforms","color":"#DC6F1D","degrees_min":180,"degrees_max":270,"items":[{"name":"PhantomJS","desc":"No description available","pc":{"r":10,"t":248},"movement":"c","blipSize":10},{"name":"JVM as platform","desc":"No description available","pc":{"r":23,"t":211},"movement":"c","blipSize":10},{"name":"Google as corporate platform","desc":"No description available","pc":{"r":51,"t":194},"movement":"c","blipSize":10},{"name":"EC2 & S3","desc":"No description available","pc":{"r":103,"t":181},"movement":"c","blipSize":10},{"name":"SMS and USSD, feature phones","desc":"No description available","pc":{"r":107,"t":230},"movement":"c","blipSize":10},{"name":"Location based services","desc":"No description available","pc":{"r":125,"t":197},"movement":"c","blipSize":10},{"name":"Mobile Web","desc":"No description available","pc":{"r":127,"t":207},"movement":"t","blipSize":10},{"name":"iPad","desc":"No description available","pc":{"r":181,"t":211},"movement":"c","blipSize":10},{"name":"Rich internet applications","desc":"No description available","pc":{"r":198,"t":250},"movement":"c","blipSize":10},{"name":"Wearable tech","desc":"No description available","pc":{"r":202,"t":244},"movement":"c","blipSize":10},{"name":"Living room technology, Xbox, PS4, Smart tvs","desc":"No description available","pc":{"r":210,"t":254},"movement":"c","blipSize":10},{"name":"Vumi","desc":"No description available","pc":{"r":234,"t":234},"movement":"c","blipSize":10},{"name":"Chromecast","desc":"No description available","pc":{"r":252,"t":247},"movement":"c","blipSize":10},{"name":"Android","desc":"No description available","pc":{"r":257,"t":215},"movement":"c","blipSize":10},{"name":"iPhone","desc":"No description available","pc":{"r":259,"t":205},"movement":"c","blipSize":10},{"name":"NoSQL using PostgreSQL, MongoDB","desc":"No description available","pc":{"r":280,"t":210},"movement":"c","blipSize":10},{"name":"OAuth","desc":"No description available","pc":{"r":284,"t":268},"movement":"t","blipSize":10},{"name":"Node.js","desc":"No description available","pc":{"r":315,"t":198},"movement":"c","blipSize":10},{"name":"Windows 8.1 Metro mode","desc":"No description available","pc":{"r":388,"t":212},"movement":"c","blipSize":10}]},{"sector":"Languages","color":"#B70062","degrees_min":270,"degrees_max":360,"items":[{"name":"Backbone.js","desc":"No description available","pc":{"r":57,"t":320},"movement":"c","blipSize":10},{"name":"Ruby","desc":"No description available","pc":{"r":67,"t":272},"movement":"c","blipSize":10},{"name":"Scala","desc":"No description available","pc":{"r":74,"t":296},"movement":"c","blipSize":10},{"name":"HTML 5","desc":"No description available","pc":{"r":99,"t":326},"movement":"c","blipSize":10},{"name":"Twitter Bootstrap","desc":"No description available","pc":{"r":184,"t":339},"movement":"c","blipSize":10},{"name":"Clojure","desc":"No description available","pc":{"r":191,"t":316},"movement":"c","blipSize":10},{"name":"Jasmine and Node.JS","desc":"No description available","pc":{"r":209,"t":294},"movement":"c","blipSize":10},{"name":"CoffeeScript","desc":"No description available","pc":{"r":227,"t":295},"movement":"c","blipSize":10},{"name":"Javascript as a 1st class language","desc":"No description available","pc":{"r":244,"t":309},"movement":"c","blipSize":10},{"name":"DSLs","desc":"No description available","pc":{"r":252,"t":315},"movement":"c","blipSize":10},{"name":"Require.js","desc":"No description available","pc":{"r":258,"t":345},"movement":"c","blipSize":10},{"name":"Groovy","desc":"No description available","pc":{"r":317,"t":273},"movement":"c","blipSize":10},{"name":"Sinatra","desc":"No description available","pc":{"r":367,"t":308},"movement":"c","blipSize":10},{"name":"CSS Frameworks","desc":"No description available","pc":{"r":383,"t":278},"movement":"c","blipSize":10}]}];
