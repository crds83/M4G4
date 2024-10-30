type Props = {
    Object:{
        name:string,
        image:string
    }
}
const Character = ({Object}:Props)=>{
    return(
        <div>
            <h1>{Object.name}</h1>
            <img src={Object.image} />
        </div>
    )
}
export default Character;