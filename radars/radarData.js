//This is the title for your window tab, and your Radar
document.title = "Pete's Technology Radar";


//This is the concentic circles that want on your radar
var radar_arcs = [
                   {'r':100,'name':'Adopt'},
                   {'r':200,'name':'Trial'},
                   {'r':300,'name':'Assess'},
                   {'r':400,'name':'Hold'}
                 ];

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

var h = 1160;
var w = 1200;

var radar_data = [
    { "quadrant": "Techniques", "color" : "#8FA227",
        "left" : 45,
        "top" : 18,
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
    { "quadrant": "Tools", "color" : "#587486",
        "left": w-200+30,
        "top" : 18,
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
    { "quadrant": "Platforms", "color" : "#DC6F1D",
        "left" :45,
         "top" : (h/2 + 18),
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
    { "quadrant": "Languages",        "color" : "#B70062",
        "left"  : (w-200+30),
        "top" :   (h/2 + 18),
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

d3_data = [
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
            { "name": "Infrastructure automation",                         "pc": { "r": 84,  "t": 175}, "movement": "c"},
            { "name": "Gradle",                                            "pc": { "r": 75,  "t": 4},   "movement": "c"},
            { "name": "Puppet",                                            "pc": { "r": 265, "t": 5},   "movement": "c"},
            { "name": "Jekyll",                                            "pc": { "r": 216, "t": 12},  "movement": "c"},
            { "name": "Github",                                            "pc": { "r": 156, "t": 15},  "movement": "c"},
            { "name": "Next gen test tools",                               "pc": { "r": 84,  "t": 18},  "movement": "c"},
            { "name": "Puppet, Chef, and Octopus",                         "pc": { "r": 323, "t": 23},  "movement": "c"},
            { "name": "Frank",                                             "pc": { "r": 31,  "t": 26},  "movement": "c"},
            { "name": "Cross mobile platforms",                            "pc": { "r": 365, "t": 27},  "movement": "c"},
            { "name": "Embeded servlet containers",                        "pc": { "r": 152, "t": 33},  "movement": "c"},
            { "name": "Graphite",                                          "pc": { "r": 109, "t": 34},  "movement": "c"},
            { "name": "Intentional Programming",                           "pc": { "r": 93,  "t": 38},  "movement": "c"},
            { "name": "NoSQL",                                             "pc": { "r": 203, "t": 45},  "movement": "c"},
            { "name": "Logstash and Graylog2",                             "pc": { "r": 287, "t": 49},  "movement": "c"},
            { "name": "Apache Pig",                                        "pc": { "r": 276, "t": 50},  "movement": "c"},
            { "name": "Locust",                                            "pc": { "r": 172, "t": 56},  "movement": "c"},
            { "name": "NuGet and Chocolatey NuGet",                        "pc": { "r": 140, "t": 64},  "movement": "c"},
            { "name": "Git",                                               "pc": { "r": 324, "t": 74},  "movement": "c"},
            { "name": "Message busses without smarts",                     "pc": { "r": 145, "t": 75},  "movement": "c"},
            { "name": "D3",                                                "pc": { "r": 128, "t": 75},  "movement": "c"},
            { "name": "Puppet-librarian and Chef-librarian",               "pc": { "r": 98,  "t": 78},  "movement": "c"},
            { "name": "TestFlight",                                        "pc": { "r": 133, "t": 79},  "movement": "c"},
            { "name": "Gatling",                                           "pc": { "r": 288, "t": 79},  "movement": "c"},
            { "name": "WebFonts and SVG",                                  "pc": { "r": 228, "t": 84},  "movement": "c"},
            { "name": "EC2 & S3",                                          "pc": { "r": 103, "t": 181}, "movement": "c"},
            { "name": "Google as corporate platform",                      "pc": { "r": 51,  "t": 194}, "movement": "c"},
            { "name": "Location based services",                           "pc": { "r": 125, "t": 197}, "movement": "c"},
            { "name": "Node.js",                                           "pc": { "r": 315, "t": 198}, "movement": "c"},
            { "name": "iPhone",                                            "pc": { "r": 259, "t": 205}, "movement": "c"},
            { "name": "Mobile Web",                                        "pc": { "r": 127, "t": 207}, "movement": "t"},
            { "name": "NoSQL using PostgreSQL, MongoDB",                   "pc": { "r": 280, "t": 210}, "movement": "c"},
            { "name": "iPad",                                              "pc": { "r": 181, "t": 211}, "movement": "c"},
            { "name": "JVM as platform",                                   "pc": { "r": 23,  "t": 211}, "movement": "c"},
            { "name": "Windows 8.1 Metro mode",                            "pc": { "r": 388, "t": 212}, "movement": "c"},
            { "name": "Android",                                           "pc": { "r": 257, "t": 215}, "movement": "c"},
            { "name": "SMS and USSD, feature phones",                      "pc": { "r": 107, "t": 230}, "movement": "c"},
            { "name": "Vumi",                                              "pc": { "r": 234, "t": 234}, "movement": "c"},
            { "name": "Wearable tech",                                     "pc": { "r": 202, "t": 244}, "movement": "c"},
            { "name": "Chromecast",                                        "pc": { "r": 252, "t": 247}, "movement": "c"},
            { "name": "PhantomJS",                                         "pc": { "r": 10,  "t": 248}, "movement": "c"},
            { "name": "Rich internet applications",                        "pc": { "r": 198, "t": 250}, "movement": "c"},
            { "name": "Living room technology, Xbox, PS4, Smart tvs",      "pc": { "r": 210, "t": 254}, "movement": "c"},
            { "name": "OAuth",                                             "pc": { "r": 284, "t": 268}, "movement": "t"},
            { "name": "Ruby",                                              "pc": { "r": 67,  "t": 272}, "movement": "c"},
            { "name": "Groovy",                                            "pc": { "r": 317, "t": 273}, "movement": "c"},
            { "name": "CSS Frameworks",                                    "pc": { "r": 383, "t": 278}, "movement": "c"},
            { "name": "Jasmine and Node.JS",                               "pc": { "r": 209, "t": 294}, "movement": "c"},
            { "name": "CoffeeScript",                                      "pc": { "r": 227, "t": 295}, "movement": "c"},
            { "name": "Scala",                                             "pc": { "r": 74,  "t": 296}, "movement": "c"},
            { "name": "Sinatra",                                           "pc": { "r": 367, "t": 308}, "movement": "c"},
            { "name": "Javascript as a 1st class language",                "pc": { "r": 244, "t": 309}, "movement": "c"},
            { "name": "DSLs",                                              "pc": { "r": 252, "t": 315}, "movement": "c"},
            { "name": "Clojure",                                           "pc": { "r": 191, "t": 316}, "movement": "c"},
            { "name": "Backbone.js",                                       "pc": { "r": 57,  "t": 320}, "movement": "c"},
            { "name": "HTML 5",                                            "pc": { "r": 99,  "t": 326}, "movement": "c"},
            { "name": "Twitter Bootstrap",                                 "pc": { "r": 184, "t": 339}, "movement": "c"},
            { "name": "Require.js",                                        "pc": { "r": 258, "t": 345}, "movement": "c"}
];
