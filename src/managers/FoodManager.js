import config from "../config";
import snake from "./SnakeManager";


class FoodManager {
    constructor() {
        this.boardSize = config.BOARD_SIZE;
        this.basicFood = config.food.basicFood;
        this.goodFood = config.food.goodFood;
        this.foodPositions = {}

        this.foodsScore = {}
        this.basicFood.forEach((food)=>{
            this.foodsScore[food.name] = food.score
        })
        this.goodFood.forEach((food)=>{
            this.foodsScore[food.name] = food.score
        })

    }
    reset(){
        for (let pos in this.foodPositions){
            this.deleteFood(pos)
        }
        this.addNextFood();
    }
    isItBasicFood(foodName){
        return this.basicFood.filter((food)=>food.name === foodName).length > 0;
    }
    getFreePos(){
        let pos = Math.floor(this.boardSize**2*Math.random())
        if (snake.isSnakeOnThisPos(pos)||this.foodPositions.hasOwnProperty(pos)) return this.getFreePos()
        return pos
    }
    deleteFood(pos){
        delete this.foodPositions[pos]
        const item = document.getElementById(`${pos}`);
        item.style.background = '';
    }
    addNextFood(){
        const pos = this.getFreePos();
        const rand = Math.random();
        for (let i = 0; i < this.basicFood.length; i++) {
            if (rand <= this.basicFood[i].probability) {
                this.foodPositions[pos] = this.basicFood[i].name;
                const item = document.getElementById(`${pos}`);
                item.style.background = this.basicFood[i].color
                break
            }
        }
    }
    addGoodFood(){
        const pos = this.getFreePos();
        const rand = Math.random();
        for (let i = 0; i < this.goodFood.length; i++) {
            if (rand <= this.goodFood[i].probability) {
                this.foodPositions[pos] = this.goodFood[i].name;
                const item = document.getElementById(`${pos}`);
                item.style.background = this.goodFood[i].color

                const timeToCrossBoard = snake.getTimeToCrossBoard();
                const lifetime = timeToCrossBoard * this.goodFood[i].lifetime;
                setTimeout(()=>this.deleteFood(pos), lifetime)
                break
            }
        }
    }

    tryToEat(pos){
        if (this.foodPositions.hasOwnProperty(pos)){

            const foodName = this.foodPositions[pos];
            this.deleteFood(pos)

            if(this.isItBasicFood(foodName)){
                this.addNextFood()
                if(Math.random()<=config.food.GOOD_FOOD_SPAWN_PROBABILITY){
                    this.addGoodFood();
                }
            }

            return this.foodsScore[foodName]
        }
        return 0
    }
}
export default new FoodManager(35)