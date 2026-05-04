import { createFileRoute, useSearch } from "@tanstack/react-router";
import React, { useEffect, useState, useRef } from "react";
import { 
  Plus, Search, Edit2, Trash2, Calendar, 
  ChevronLeft, ChevronRight, Loader2, Image as ImageIcon, X, Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Table, TableBody, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { toast } from "sonner";
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, 
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
  AlertDialogHeader, AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";

export const Route = createFileRoute("/admin/events")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      category: (search.category as string) || "Upcoming events",
    };
  },
  component: AdminEvents,
});

const CATEGORIES = [
  "Past Events",
  "Upcoming events",
  "Gallery",
  "Initiatives",
  "Awards",
  "Leaders"
];

function AdminEvents() {
  const { category } = useSearch({ from: "/admin/events" });
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: format(new Date(), "yyyy-MM-dd"),
    category: category,
    president: "",
    secretary: "",
    treasurer: "",
    governor: "",
    riTheme: "",
    location: "",
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(prev => ({ ...prev, category }));
    setPage(1); 
  }, [category]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/events?page=${page}&limit=10&category=${category}`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
        setTotal(data.total);
      }
    } catch (err) {
      toast.error("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page, category]);

  const handleOpenDialog = (event: any = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        date: format(new Date(event.date), "yyyy-MM-dd"),
        category: event.category,
        president: event.president || "",
        secretary: event.secretary || "",
        treasurer: event.treasurer || "",
        governor: event.governor || "",
        riTheme: event.riTheme || "",
        location: event.location || "",
      });
      setImagePreviews(event.images || []);
      setSelectedImages([]);
    } else {
      setEditingEvent(null);
      setFormData({
        title: "",
        description: "",
        date: format(new Date(), "yyyy-MM-dd"),
        category: category,
        president: "",
        secretary: "",
        treasurer: "",
        governor: "",
        riTheme: "",
        location: "",
      });
      setImagePreviews([]);
      setSelectedImages([]);
    }
    setIsDialogOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const isSingleImageCategory = ["Upcoming events", "Initiatives", "Awards"].includes(formData.category);
    const currentTotal = selectedImages.length + (editingEvent?.images?.length || 0);
    const limit = isSingleImageCategory ? 1 : 15;

    if (files.length + currentTotal > limit) {
      toast.error(`Maximum ${limit} image(s) allowed for this category`);
      return;
    }

    const newFiles = [...selectedImages, ...files];
    setSelectedImages(newFiles);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);

    const previewIndex = index - (editingEvent?.images?.length || 0);
    if (previewIndex >= 0) {
      const newFiles = [...selectedImages];
      newFiles.splice(previewIndex, 1);
      setSelectedImages(newFiles);
    } else if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        images: editingEvent.images.filter((_: any, i: number) => i !== index)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("president", formData.president);
      formDataToSend.append("secretary", formData.secretary);
      formDataToSend.append("treasurer", formData.treasurer);
      formDataToSend.append("governor", formData.governor);
      formDataToSend.append("riTheme", formData.riTheme);
      formDataToSend.append("location", formData.location);
      
      selectedImages.forEach(file => {
        formDataToSend.append("images", file);
      });

      if (editingEvent) {
        formDataToSend.append("existingImages", JSON.stringify(editingEvent.images));
      }

      const token = localStorage.getItem("admin_token");
      const url = editingEvent ? `/api/admin/events/${editingEvent._id}` : "/api/admin/events";
      const method = editingEvent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success(editingEvent ? "Updated successfully" : "Created successfully");
        setIsDialogOpen(false);
        fetchEvents();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to save");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;
    const id = eventToDelete;

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success("Deleted successfully");
        fetchEvents();
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      toast.error("An error occurred during deletion");
    } finally {
      setIsDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{category} Management</h1>
          <p className="text-muted-foreground">Manage and update your club's {category.toLowerCase()} content.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="rounded-xl gap-2 shadow-lg shadow-primary/20">
          <Plus size={18} />
          Add New {category === "Gallery" ? "Image" : "Entry"}
        </Button>
      </div>

      <Card className="border-none shadow-soft">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={`Search in ${category}...`} 
                className="pl-9 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Title/Info</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Images</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <span>Loading content...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                      No items found in {category}.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvents.map((event) => (
                    <TableRow key={event._id} className="hover:bg-muted/20">
                      <TableCell>
                        <div className="font-semibold">{event.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1 max-w-[300px]">
                          {event.description}
                        </div>
                      </TableCell>
                      <TableCell>{format(new Date(event.date), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <ImageIcon size={14} className="text-muted-foreground" />
                          <span className="text-sm font-medium">{event.images?.length || 0}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-blue-500 hover:bg-blue-500/10"
                            onClick={() => handleOpenDialog(event)}
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              setEventToDelete(event._id);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredEvents.length} items
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="text-sm font-medium">Page {page}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPage(p => p + 1)}
              disabled={page * 10 >= total || loading}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto rounded-2xl">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="text-2xl">{editingEvent ? "Edit Entry" : "Create New Entry"}</DialogTitle>
              <DialogDescription>
                Make changes to your {formData.category.toLowerCase()} content here.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-6">
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  {formData.category === "Leaders" ? "Year (e.g. 2024-2025)" : 
                   formData.category === "Awards" ? "Award Name" : 
                   "Title"}
                </label>
                <Input 
                  placeholder="Enter the title or year..."
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(val) => setFormData({...formData, category: val})}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input 
                    type="date" 
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              {category === "Upcoming events" && (
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Location / Venue</label>
                  <Input 
                    placeholder="e.g. Tirunelveli Convention Hall"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="rounded-xl"
                  />
                </div>
              )}

              {formData.category !== "Gallery" && (
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    {formData.category === "Leaders" ? "RI Theme Description" : 
                     formData.category === "Awards" ? "Recognition / Citation" : 
                     formData.category === "Upcoming events" ? "Event Description" :
                     "Description"}
                  </label>
                  <Textarea 
                    placeholder="Enter detailed information here..." 
                    className="min-h-[100px] rounded-xl resize-none"
                    maxLength={1000}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    required={formData.category !== "Gallery"}
                  />
                </div>
              )}

              {formData.category === "Leaders" && (
                <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="grid gap-2">
                    <label className="text-xs font-bold uppercase text-primary">President Name</label>
                    <Input 
                      value={formData.president}
                      onChange={e => setFormData({...formData, president: e.target.value})}
                      placeholder="Rtn. Name"
                      className="rounded-lg h-9"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs font-bold uppercase text-primary">Secretary Name</label>
                    <Input 
                      value={formData.secretary}
                      onChange={e => setFormData({...formData, secretary: e.target.value})}
                      placeholder="Rtn. Name"
                      className="rounded-lg h-9"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs font-bold uppercase text-primary">Treasurer Name</label>
                    <Input 
                      value={formData.treasurer}
                      onChange={e => setFormData({...formData, treasurer: e.target.value})}
                      placeholder="Rtn. Name"
                      className="rounded-lg h-9"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs font-bold uppercase text-primary">District Governor</label>
                    <Input 
                      value={formData.governor}
                      onChange={e => setFormData({...formData, governor: e.target.value})}
                      placeholder="Rtn. Name"
                      className="rounded-lg h-9"
                    />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <label className="text-xs font-bold uppercase text-primary">RI Theme (Year Theme)</label>
                    <Input 
                      value={formData.riTheme}
                      onChange={e => setFormData({...formData, riTheme: e.target.value})}
                      placeholder="e.g. Magic of Rotary"
                      className="rounded-lg h-9"
                    />
                  </div>
                </div>
              )}

              {formData.category !== "Leaders" && (
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    {["Upcoming events", "Initiatives", "Awards"].includes(formData.category) ? "Featured Image (Single)" : "Images (Max 15)"}
                  </label>
                  <div 
                    className="border-2 border-dashed border-muted-foreground/20 rounded-2xl p-4 text-center cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 bg-primary/10 rounded-full text-primary">
                        <Upload size={24} />
                      </div>
                      <div className="text-sm font-medium">Click to upload</div>
                    </div>
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleImageChange}
                    />
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-4 gap-3 mt-4">
                      {imagePreviews.map((src, i) => (
                        <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border">
                          <img src={src} alt="Preview" className="h-full w-full object-cover" />
                          <button 
                            type="button"
                            className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full"
                            onClick={() => removeImage(i)}
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="submit" className="rounded-xl gap-2 w-full" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {editingEvent ? "Save Changes" : "Create Entry"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-display font-bold">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-base">
              This action cannot be undone. This will permanently delete the entry
              and remove all associated images from Cloudinary.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel className="rounded-xl border-muted hover:bg-muted/50">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20"
            >
              Yes, Delete Entry
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
