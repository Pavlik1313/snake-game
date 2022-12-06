import '../styles/gameFild.css'
export default function gameFild (){
    const BOARD_SIZE = 25;
    const BOARD = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0))
    return(<div className='field'>
        {BOARD.map((row, indexR)=>
            (<div className='rows'>
                {row.map((item,indexI)=>{return(<div className='items'>
                        </div>)})}
            </div>)
        )}
    </div>)
}