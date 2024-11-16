import { useParams } from 'react-router-dom';

export default function ProjectPage() {
    const { id } = useParams();
    
    return (
        <div className="container mx-auto py-6">
        <h1>Project Details {id}</h1>
        {/* Add your project details here */}
        </div>
    );
}