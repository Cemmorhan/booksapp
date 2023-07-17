
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';



export default withPageAuthRequired(function sell(props) {
    const { user, error, isLoading } = useUser();



    return (
       <div>
        holav
       </div>


    )
})