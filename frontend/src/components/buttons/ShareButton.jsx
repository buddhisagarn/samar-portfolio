import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

const ShareButton = ({ title, description, url }) => {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title,
        text: description,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  return (
    <Button
      variant="outline"
      className="rounded-xl border-blue-300 text-blue-700 hover:bg-blue-50"
      onClick={handleShare}
    >
      <Share2 size={16} className="mr-1" /> Share
    </Button>
  );
};

export default ShareButton;
