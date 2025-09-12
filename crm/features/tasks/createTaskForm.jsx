import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { cn } from "@/lib/utils"; // Assuming you have a utils file for merging classNames

// --- Shadcn UI Components ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

// --- Icons from lucide-react ---
import { Calendar as CalendarIcon, Search, Upload, Paperclip, X } from "lucide-react";
import { format } from "date-fns";
import CombinedSearchInput from '../../components/CombinedSearchInput';


// --- Main Create Task Form Component ---
const CreateTaskForm = () => {
    // State management using React Hook Form
    const { register, handleSubmit, control, formState: { errors, isSubmitting }, watch, setValue } = useForm({
        defaultValues: {
            title: '',
            description: '',
             createdFor: 'Bhavya Sharma / BHFC3558F',
            dueDate: null,
            reminder: false,
            reminderOn: 'due_date',
            reminderTime: '09:00',
            assignedTo: '',
            priority: 'medium',
            category: '',
            subCategory: '',
            collaborators: '',
            attachments: [],
        }
    });
    
    const watchAttachments = watch("attachments");

    // Mock data for dropdowns
    const userOptions = [
        { value: 'nitish_sharma', label: 'Nitish Sharma' },
        { value: 'dev_kumar', label: 'Bhavya Sharma' },
        { value: 'mahesh_kapoor', label: 'Mahesh Kapoor' },
        { value: 'self', label: 'Self' },
                { value: 'self', label: 'Self' },
        { value: 'self', label: 'Self' },
        { value: 'self', label: 'Self' },
        { value: 'self', label: 'Self' },
        { value: 'self', label: 'Self' },

    ];

    const categoryOptions = [
        { value: 'sales', label: 'Sales' },
        { value: 'meeting', label: 'Meeting' },
        { value: 'documentation', label: 'Documentation' },
        { value: 'call', label: 'Follow-up Call' },
    ];
    
     const subCategoryOptions = [
        { value: 'assets', label: 'Assets' },
        { value: 'leads', label: 'Leads' },
    ];
    
    const priorityOptions = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
    ];

    const handleFileChange = (event) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files).map(file => ({
                name: file.name,
                size: file.size,
            }));
            setValue('attachments', [...watchAttachments, ...newFiles]);
        }
    };
    
    const handleDeleteFile = (fileName) => {
        setValue('attachments', watchAttachments.filter(file => file.name !== fileName));
    };

    const handleFormSubmit = (data) => {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("Form Submitted:", data);
                alert("Form submitted! Check the console for values.");
                resolve();
            }, 1000);
        });
    };

    const searchCategories = [
    'Client', 'Leads', 'User'
  ];

  // Example data source, this could be from anywhere.
  const searchData = [
    'Bhavya Sharma / BHFC3558F','Bhavya Sharma / BHFC3558F','Bhavya Sharma / BHFC3558F','Bhavya Sharma / BHFC3558F','Bhavya Sharma / BHFC3558F','Bhavya Sharma / BHFC3558F','Bhavya Sharma / BHFC3558F','Bhavya Sharma / BHFC3558F','Bhavya Sharma / BHFC3558F','Bhavya Sharma / BHFC3558F','Bhavya Sharma / BHFC3558F','Bhavya Sharma / BHFC3558F','Bhavya Sharma / BHFC3558F','Bhavya Sharma / BHFC3558F','Bhavya Sharma / BHFC3558F', 'Priya Singh / AGDC1234Y', 'Rohan Mehta / WXYZ9876T', 'Anjali Sharma / LMNO4567Z', 'Vikram Rathod / PQRS1234A', 'Sunita Gupta / UVWX5678B', 'Amit Patel / CDEF9012C', 'Deepika Iyer / GHIJ3456D', 'Aarav Verma / KMNP7890E', 'Isha Jain / QWER1234F', 'Mohit Agarwal / TYUI5678G', 'Kavita Reddy / OPAS3456H', 'Rajesh Mishra / DFGH7890I', 'Sneha Joshi / JKLC1234J', 'Arjun Shah / VBNM5678K', 'Neha Bhatt / ZXCV9012L', 'Karan Chauhan / POIU3456M', 'Pooja Kapoor / LKJH7890N', 'Suresh Nair / ASDF1234O', 'Meera Desai / GHJK5678P', 'Aditya Rao / QWET7890Q', 'Rina Das / YUIO1234R', 'Sameer Mukherjee / PLMK5678S', 'Diya Bose / OIJN9012T', 'Ankit Yadav / UHBG3456U', 'Tanvi Reddy / RFVC7890V', 'Manish Kumar / TGBN1234W', 'Shreya Singh / YHNM5678X', 'Varun Mehta / UJMK9012Y', 'Geeta Sharma / IKOL3456Z',
  ];

  const [selectedCategory, setSelectedCategory] = useState(searchCategories[0]);
  const [selectedValue, setSelectedValue] = useState('Bhavya Sharma / BHFC3558F');

  // Define the search handler function. This can fetch data from an API.
  const handleSearch = async (searchTerm) => {
    console.log(`Searching for '${searchTerm}' in category '${selectedCategory}'`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!searchTerm) return [];

    // Filter the data based on the search term
    const filteredData = searchData.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filteredData;
  };

    return (
        <div className="flex flex-col h-full bg-card text-card-foreground rounded-xl shadow-md">
            <header className="p-6 border-b border-border">
                <h1 className="text-xl font-semibold">Tasks &gt; Create Task</h1>
            </header>
            
            <main className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8 max-w-4xl">
                    {/* --- Form Fields --- */}
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="title" className="font-semibold">Title <span className="text-red-500">*</span></Label>
                        <Input id="title" type="text" placeholder="e.g. Asset Allocation meeting with Bhavya Sharma" {...register("title", { required: "Title is required" })} />
                         {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="description" className="font-semibold">Description</Label>
                        <Textarea id="description" placeholder="e.g. Today I had the pleasure of meeting with Mr Mahesh Kapoor to discuss and review his current investment" className="min-h-[100px]" {...register("description")} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <Controller name="createdFor" control={control} rules={{ required: "This field is required" }} render={({ field }) => (
                            <div className="grid w-full items-center gap-1.5">
                                <Label className="font-semibold">Created For <span className="text-red-500">*</span></Label>
                                <CombinedSearchInput
                                    categories={searchCategories}
                                    selectedCategory={selectedCategory}
                                    onCategoryChange={setSelectedCategory}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onSearch={handleSearch}
                                    placeholder={`Search by ${selectedCategory}...`}
                                />
                                {errors.createdFor && <p className="text-red-500 text-xs mt-1">{errors.createdFor.message}</p>}
                            </div>
                        )}/>
                        
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="font-semibold">Status</Label>
                            <Input value="Pending" disabled className="bg-muted" />
                        </div>

                        <div>
                            <Controller name="dueDate" control={control} rules={{ required: "Due date is required" }} render={({ field }) => (
                                 <div className="grid w-full items-center gap-1.5">
                                    <Label className="font-semibold">Due Date <span className="text-red-500">*</span></Label>
                                    <Popover><PopoverTrigger asChild><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover>
                                    {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate.message}</p>}
                                </div>
                            )}/>
                            <div className="flex items-start flex-col space-y-3 mt-3">
                                <Controller name="reminder" control={control} render={({ field }) => (
                                    <div className="flex items-center space-x-2"><Checkbox id="reminder" checked={field.value} onCheckedChange={field.onChange} /><label htmlFor="reminder" className="text-sm font-medium">Send Reminder 1 day before due date</label></div>
                                )}/>
                            </div>
                        </div>

                        <Controller name="assignedTo" control={control} rules={{ required: "This field is required" }} render={({ field }) => (
                            <div className="relative grid w-full items-center gap-1.5">
                               <Label className="font-semibold">Assigned To <span className="text-red-500">*</span></Label>
                               <Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger className="pr-8"><SelectValue placeholder="Select" /></SelectTrigger><Search className="h-4 w-4 opacity-50 absolute right-3 top-[38px] -translate-y-1/2" /><SelectContent>{userOptions.map(u => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}</SelectContent></Select>
                               {errors.assignedTo && <p className="text-red-500 text-xs mt-1">{errors.assignedTo.message}</p>}
                            </div>
                        )}/>
                    </div>

                    <Controller name="priority" control={control} render={({ field }) => (
                        <div className="grid w-full items-center gap-2">
                           <Label className="font-semibold">Priority</Label>
                           <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-1">
                               {priorityOptions.map(option => (
                                    <Label key={option.value} htmlFor={`priority-${option.value}`} className={cn(`flex items-center justify-center w-24 h-9 rounded-md cursor-pointer border text-sm`, field.value === option.value ? (option.value === 'high' ? 'bg-red-100 border-red-500 text-red-700 font-semibold' : 'bg-primary/10 border-primary text-primary font-semibold') : 'border-input bg-transparent')}>
                                       <RadioGroupItem value={option.value} id={`priority-${option.value}`} className="sr-only" />
                                       <span>{option.label}</span>
                                   </Label>
                               ))}
                           </RadioGroup>
                        </div>
                    )}/>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Controller name="category" control={control} render={({ field }) => (
                            <div className="grid w-full items-center gap-1.5"><Label className="font-semibold">Category</Label><Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{categoryOptions.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent></Select></div>
                        )}/>
                         <Controller name="subCategory" control={control} render={({ field }) => (
                            <div className="grid w-full items-center gap-1.5"><Label className="font-semibold">Sub Category</Label><Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{subCategoryOptions.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent></Select></div>
                        )}/>
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label className="font-semibold">Collaborators</Label>
                         <Controller name="collaborators" control={control} render={({ field }) => (
                             <Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{userOptions.map(u => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}</SelectContent></Select>
                        )}/>
                    </div>

                    <div className="grid w-full items-center gap-2">
                        <div className="flex justify-between items-center">
                            <Label className="font-semibold">Attachments</Label>
                             <Button type="button" variant="ghost" size="sm" onClick={() => document.getElementById('file-upload').click()} className="text-primary gap-2"><Upload className="w-4 h-4" /><span>Upload</span></Button>
                             <input type="file" id="file-upload" multiple onChange={handleFileChange} className="hidden" />
                        </div>
                        <div className="space-y-2">
                            {watchAttachments.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-muted/50">
                                    <div className="flex items-center gap-2">
                                        <Paperclip className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">{file.name}</span>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => handleDeleteFile(file.name)}><X className="w-4 h-4 text-muted-foreground" /></Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-4 pt-6 mt-4 border-t border-border">
                        <Button type="button" variant="outline" className="w-28">Cancel</Button>
                        <Button type="submit" disabled={isSubmitting} className="w-28">{isSubmitting ? 'Creating...' : 'Create'}</Button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default CreateTaskForm;

