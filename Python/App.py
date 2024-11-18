import customtkinter as ctk
from tkinter import filedialog, messagebox


def submit_form():
    name = name_entry.get()
    age = age_var.get()
    file_path = file_var.get()

    if not name or not age or not file_path:
        messagebox.showerror("Error", "All fields are required!")
        return

    print(f"Name: {name}\nAge: {age}\nFile: {file_path}")
    messagebox.showinfo("Success", "Form Submitted Successfully!")


def upload_file():
    file_path = filedialog.askopenfilename(
        title="Select a File",
        filetypes=(
            ("All Files", "*.*"),
            ("Text Files", "*.txt"),
            ("PDF Files", "*.pdf"),
            ("Image Files", "*.jpg;*.jpeg;*.png;*.gif"),
        ),
    )
    file_var.set(file_path)


# Initialize the main window
ctk.set_appearance_mode("light") 
ctk.set_default_color_theme("green")  

app = ctk.CTk()
app.title("Healthcare Dashboard")
app.geometry("800x600")

app.grid_columnconfigure(0, weight=1)  

# Header Section
header_label = ctk.CTkLabel(
    app, text="Healthcare Dashboard", font=("Helvetica Neue", 28, "bold")
)
header_label.grid(row=0, column=0, pady=(20, 5), sticky="N")

sub_header_label = ctk.CTkLabel(
    app,
    text="Manage your medical data efficiently",
    font=("Helvetica Neue", 16),
)
sub_header_label.grid(row=0, column=0, pady=(55, 20), sticky="N")

# Form Title
form_title = ctk.CTkLabel(
    app, text="Upload Your Medical File", font=("Helvetica Neue", 20, "bold")
)
form_title.grid(row=1, column=0, pady=(30, 10), sticky="N")  # Add space between title and form

# Form Section
form_frame = ctk.CTkFrame(app)
form_frame.grid(row=2, column=0, padx=20, pady=20, sticky="N")
form_frame.grid_columnconfigure(1, weight=1)  

# Name Input
name_label = ctk.CTkLabel(form_frame, text="Name:", font=("Helvetica Neue", 16))
name_label.grid(row=0, column=0, padx=10, pady=10, sticky="W")

name_entry = ctk.CTkEntry(form_frame, placeholder_text="Enter your name")
name_entry.grid(row=0, column=1, padx=10, pady=10, sticky="EW")

# Age Dropdown
age_label = ctk.CTkLabel(form_frame, text="Age:", font=("Helvetica Neue", 16))
age_label.grid(row=1, column=0, padx=10, pady=10, sticky="W")

# Add border using CTkFrame
age_frame = ctk.CTkFrame(form_frame, border_width=2, border_color="gray", corner_radius=5)
age_frame.grid(row=1, column=1, padx=10, pady=10, sticky="EW")

age_var = ctk.StringVar()
age_dropdown = ctk.CTkOptionMenu(age_frame, values=[str(i) for i in range(1, 101)], variable=age_var)
age_dropdown.pack(fill="both", expand=True, padx=2, pady=2) 

# File Upload
file_label = ctk.CTkLabel(form_frame, text="File:", font=("Helvetica Neue", 16))
file_label.grid(row=2, column=0, padx=10, pady=10, sticky="W")

file_var = ctk.StringVar()
file_button = ctk.CTkButton(form_frame, text="Upload File", command=upload_file, font=("Helvetica Neue", 14))
file_button.grid(row=2, column=1, padx=(0, 150), pady=10, sticky="W")

file_entry = ctk.CTkEntry(form_frame, textvariable=file_var, placeholder_text="No file selected", state="readonly")
file_entry.grid(row=2, column=1, padx=(150, 10), pady=10, sticky="EW")

# Submit Button
submit_button = ctk.CTkButton(
    app, text="Submit", font=("Helvetica Neue", 18), command=submit_form
)
submit_button.grid(row=3, column=0, pady=20)

# Run the application
app.mainloop()
