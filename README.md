# Places2Go API

This API is destined to match a web/app user to locations nearby. It uses IBM Watson Personality Insights API to form a personality profile for a web/app user based on his tweets.
It then uses same Watson API to form personality profile for each location based on the reviews posted on Yelp (Thank to Yelp for providing 1M reviews data) 

Then it finds the closest match by calculating Eucledian distance between the personality profile of the web/app user and location based on "Needs" and "Values"criteria:

##Needs for

1. Challenge
2. Closeness
3. Curiosity
4. Excitement
5. Harmony
6. Ideal
7. Liberty
8. Love
9. Practicality
10. Self-expression
11. Stability
12. Structure

##Values

1. Conservation
2. Openness to change
3. Hedonism
4. Self-enhancement
5. Self-transcendence

For more information on how personality profile is formed, please refer to https://developer.ibm.com/watson/blog/2015/03/23/ibm-watson-personality-insights-science-behind-service/



