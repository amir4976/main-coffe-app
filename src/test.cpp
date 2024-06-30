struct student {
    char name[50];
    int ID;
}
student Read(void);
void sort(student x[], int k);
void print (student x);
int min (student x[], int l,int u);
void swap (student *a,student *b);
void main (){
    int i;student dept[n];
    for (i=0;i<n;i++){
        dept[i]=Read();
    }
    sort(dept,n);
    for (i=0;i<n;i++){
        print(dept[i]);
    }
}



student Read(){
    student x;
    cin >> x.name >> x.ID;
    return x;
}

void print(student x){
    cout << x.name << " " << x.ID << endl;
}

void sort(student x[], int k){
    int i,index;
    for (i=0;i<n;i++){
        index = min(x,i,k-1);
        swap(& dept[i],& dept[index]);
    }
}

int min (student x[], int l,int u){
    int i,min_index;
   min_index = 0;
   for(i=l+1;i<=u;i++){
        if(x[i].id < x[index_min].ID)
            indexmin=i
   }
   return min_index;
}