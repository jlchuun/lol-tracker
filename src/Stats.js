class Stats {
    static MostKills = new Stats('Most Kills')
    static MostDeaths = new Stats('Most Deaths')
    static MostAssists = new Stats('Most Assists')
    static LeastKills = new Stats('Least Kills')
    static LeastDeaths = new Stats('Least Deaths')
    static LeastAssists = new Stats('Least Assists')

    constructor(name) {
        this.name = name
    }
}

export default Stats