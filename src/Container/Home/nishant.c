#include <stdio.h>
#include <conio.h>
#include <stdlib.h>
int *sum(int *ptr, int n, int d)
{
    *ptr = *ptr + d;
    return ptr;
}
double get_mean(int *ptr, int n)
{
    return (double)*ptr / n;
}
int main()
{
    int *ptr = (int *)malloc(4);
    int d;
    scanf("%d", &d);
    ptr[0] = d;
    int n = 1;
    while (scanf("%d", &d))
    {
        if (d == -1)
        {
            break;
        }
        ptr = sum(ptr, n, d);
        n++;
    }
    printf("%.2lf", get_mean(ptr, n));
    return 0;
}