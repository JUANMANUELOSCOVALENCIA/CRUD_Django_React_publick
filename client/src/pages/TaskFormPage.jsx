import {useForm} from "react-hook-form";
import {createTask, deleteTask, getTask, updateTask} from "../api/tasks.api.js";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import toast from "react-hot-toast";

export function TaskFormPage(){
    const {register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm();

    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async data =>{
        if(params.id){
            await updateTask(params.id, data);
            toast.success('Tarea Actualizada', {
                position:"bottom-right",
                style:{
                    background: "#101010",
                    color:"#fff",
                }
            })
        }else {
            await createTask(data)
            toast.success('Tarea Creada', {
                position:"bottom-right",
                style:{
                    background: "#101010",
                    color:"#fff",
                }
            })
        }
        navigate("/tasks");
    })

    useEffect(() => {
        async function loadTasks() {
            if (params.id){
                const {
                    data: {title, description},
                } = await getTask(params.id);
                setValue('title', title)
                setValue('description', description)
            }
        }
        loadTasks();
    }, []);

    return(
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                <input
                    type="Texto"
                    placeholder="Titulo"
                    {...register("title", {required: true})}
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                />
                {errors.title && <span>Campo Obligatorio</span>}
                <textarea
                    rows="3"
                    placeholder="Description"
                    {...register("description", {required: true})}
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                ></textarea>
                {errors.description && <span>Campo Obligatorio</span>}
                <button
                    className="bg-indigo-500 p-3 rounded-lg block w-full mb-3"
                >Guardar</button>
            </form>

            {params.id && (
                <div className="flex justify-end">
                    <button
                    className="bg-red-500 p-3 rounded-lg w-48 mt-3"
                    onClick={async () => {
                        const accepted = window.confirm("Estas Seguro?")
                        if(accepted){
                            await deleteTask(params.id);
                            toast.success('Tarea Eliminada', {
                            position:"bottom-right",
                            style:{
                                background: "#101010",
                                color:"#fff",
                            }
                            })
                            navigate("/tasks");
                        }
                    }}
                >
                    Eliminar
                </button>
                </div>
                )}
        </div>
    )
}