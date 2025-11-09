import { Edit, Trash2, FileText, ExternalLink } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";

const DocumentCard = ({ document, onEdit, onDelete }) => {
  return (
    <Card>
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <FileText size={20} className="text-indigo-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{document.nom}</h3>
          <a
            href={document.urlStocket}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-600 hover:underline mt-1"
          >
            <ExternalLink size={14} />
            Voir le document
          </a>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={onEdit} className="flex-1">
          <Edit size={16} className="inline mr-1" />
          Modifier
        </Button>
        <Button variant="danger" onClick={onDelete} className="flex-1">
          <Trash2 size={16} className="inline mr-1" />
          Supprimer
        </Button>
      </div>
    </Card>
  );
};

export default DocumentCard;
