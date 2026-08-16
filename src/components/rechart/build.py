
with open('./_DIR') as f:
    for line in f:
       line2 = line.rstrip('\r\n')
       #print(line2)
       if line2.endswith("tsx"):
           if not line2.endswith("index.tsx"):
               if not line2.endswith("Example.tsx"):
                   line3 = line2[:-4]
                   #print(line3)
                   param = line3.split("/")
                   #print(param[-1])
                   print("import %s   from \"./%s\";"  % (param[-1], line3))                        
                   print("export { %s };"  % (param[-1]))                        


