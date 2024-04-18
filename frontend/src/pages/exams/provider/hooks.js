import { useContext } from "react"
import Context from './Context'

const useExam = () => {
    const [state, dispatch] = useContext(Context);

    return [state, dispatch]
}

export { useExam };