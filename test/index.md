
# ddad

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql-svc
  labels:
    app: mysql-svc
spec:
  selector:
    app: mysql
  ports:
  - name: mysql
    port: 3306
    targetPort: 3306

```{{copy}}