import { Check, MessageSquareHeart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRequireSignIn, useSession } from "@/hooks/use-session";
import type { Person } from "@/lib/data";

export function MentorRequestButton({ mentor }: { mentor: Person }) {
  const { mentorRequests, requestMentor } = useSession();
  const requireSignIn = useRequireSignIn();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const requested = mentorRequests.includes(mentor.id);

  if (requested) {
    return (
      <Button size="sm" variant="secondary" disabled>
        <Check /> Request sent
      </Button>
    );
  }

  return (
    <>
      <Button
        size="sm"
        variant="teal"
        onClick={() => {
          if (requireSignIn("request mentorship")) setOpen(true);
        }}
      >
        <MessageSquareHeart /> Request mentorship
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              requestMentor(mentor.id);
              setOpen(false);
              setMessage("");
              toast.success(`Mentorship request sent to ${mentor.name}`);
            }}
          >
            <DialogHeader>
              <DialogTitle className="text-primary">Request mentorship</DialogTitle>
              <DialogDescription>
                Tell {mentor.name} what you'd like help with. Short and specific works best.
              </DialogDescription>
            </DialogHeader>
            <div className="my-5 space-y-2">
              <Label htmlFor={`msg-${mentor.id}`}>Your message</Label>
              <Textarea
                id={`msg-${mentor.id}`}
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="I'm a final-year student and I'd like advice on…"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="teal">
                Send request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
