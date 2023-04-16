from django.shortcuts import render
from django.http import HttpResponse
from .decorators import *
import mimetypes
import io

def encryption(request):
    if request.method == 'POST':
        encryption_type = request.POST.get('encryption_type')
        if encryption_type == 'text':
            text = request.POST.get('text')
            orig_text = text
            ciphertext = encrypt(text, encryption_key)
            ciphertext = str(ciphertext)
            return render(request, 'encryption.html', {'ciphertext': ciphertext, 'origtext': orig_text})
        elif encryption_type == 'file':
            file = request.FILES['file']
            file_content = file.read().decode('utf-8')
            file_name = file.name
            file_type = mimetypes.guess_type(file_name)[0]
            ciphertext = encrypt(file_content, encryption_key)
            ciphertext = str(ciphertext)
            encrypted_file = io.BytesIO()
            encrypted_file.write(ciphertext.encode('utf-8'))
            encrypted_file.seek(0)
            response = HttpResponse(encrypted_file, content_type=file_type)
            response['Content-Disposition'] = f'attachment; filename="enc_{file_name}"'

            return response
        elif encryption_type == 'decrypt_text':
            ciphertext = request.POST.get('text')
            orig_text = ciphertext
            ciphertext = decrypt(ciphertext, encryption_key)
            return render(request, 'encryption.html', {'origtext': orig_text, 'ciphertext': ciphertext})       
        elif encryption_type == 'decrypt_file':
            file = request.FILES['file']
            file_content = file.read().decode('utf-8')
            file_name = file.name
            file_type = mimetypes.guess_type(file_name)[0]
            text = decrypt(file_content, encryption_key)
            ciphertext_str = text
            encrypted_file = io.BytesIO()
            encrypted_file.write(ciphertext_str.encode('utf-8'))
            encrypted_file.seek(0)
            response = HttpResponse(encrypted_file, content_type=file_type)
            response['Content-Disposition'] = f'attachment; filename="dec_{file_name}"'

            return response  
    return render(request, 'encryption.html')

