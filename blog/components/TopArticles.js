import '../public/css/components/topArticles.css'

const TopArticles = () => {
    return (
        <div className='topArticles'>
            <div><h1 className = "insp">Inspiration</h1><p className="inspDesc"> Despite having taken Data Structures in school, I would like to enhance my knowledge by continuing to study by reading and practicing with <i>Algorithms 4th Edition</i> by Robert Sedgewick and
            Kevin Wayne.</p><p className="inspDesc">My main goal of writing blogs is to record what I've learned for future reference and to solidify understanding.</p><p className="inspDesc inspDesc3">  My blogs are based solely on personal learning experience and might contain errors or misunderstandings. Any advice would be appreciated!</p></div>
            <div><img src='https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' width='100%'></img></div>
        </div>
    )
}

export default TopArticles;