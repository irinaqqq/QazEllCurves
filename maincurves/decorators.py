from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend
import random
from cryptography.hazmat.primitives.asymmetric import ec

def key():
    curve = ec.SECP256R1()

    # Generate a private key
    private_key = ec.generate_private_key(curve)

    # Compute the public key
    public_key = private_key.public_key()

    # Generate a random ephemeral key
    ephemeral_key = ec.generate_private_key(curve)

    # Compute the shared secret
    shared_secret = ephemeral_key.exchange(ec.ECDH(), public_key)

    # Derive the encryption key from the shared secret
    encryption_key = shared_secret[:16]
    # print("enc key1", encryption_key)
    return encryption_key


def encrypt(text, encryption_key):
    # encryption_key = b'0123456789ABCDEF'
    # print("Plaintext:", text)
    message = text.encode('utf-8')
    iv = b'\x00' * 16
    cipher = Cipher(algorithms.AES(encryption_key), modes.CBC(iv), backend=default_backend())
    padder = padding.PKCS7(128).padder()
    padded_message = padder.update(message) + padder.finalize()
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(padded_message) + encryptor.finalize()
    # print("Ciphertext:", ciphertext.hex())
    ciphertext = ciphertext.hex()
    return (ciphertext)


def decrypt(ciphertext, encryption_key):
    # encryption_key = b'0123456789ABCDEF'
    # print("enc key2", encryption_key)
    # print("Ciphertext:", ciphertext)
    iv = b'\x00' * 16
    # ciphertext_data = ciphertext.hex()
    ciphertext_bytes = bytes.fromhex(ciphertext)
    cipher = Cipher(algorithms.AES(encryption_key), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    decrypted_padded_message = decryptor.update(ciphertext_bytes)
    unpadder = padding.PKCS7(128).unpadder()
    decrypted_message = unpadder.update(decrypted_padded_message) + unpadder.finalize()
    # print("Decrypted message:", decrypted_message.decode('utf-8'))
    decrypted_message = decrypted_message.decode('utf-8')
    return decrypted_message


encryption_key = key()
print("enc key", encryption_key)
text = 'Hello, world на русском'
# ciphertext = encrypt(text, encryption_key)
# ciphertext, encryption_key = encrypt(text, encryption_key)
# print(encryption_key)
# print("Ciphertext:", ciphertext)
# decrypted_text = decrypt(ciphertext, encryption_key)
# print(decrypted_text)