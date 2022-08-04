import { useParams } from 'react-router-dom'

const Summoner = () => {
    let params = useParams()

    return (
        <div>
            <h1>{params.summonerName}</h1>
        </div>
    )
}

export default Summoner