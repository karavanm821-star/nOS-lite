void kernel_main(void)
{
    volatile char* video = (volatile char*)0xB8000;

    const char* text = "nOS Lite - Booted successfully!";

    for (int i = 0; text[i] != '\0'; i++)
    {
        video[i * 2] = text[i];
        video[i * 2 + 1] = 0x07;
    }

    while (1)
    {
        __asm__ volatile ("hlt");
    }
}
