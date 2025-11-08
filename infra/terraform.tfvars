aws_region           = "ap-northeast-2"
aws_profile          = "trippin"  # optional
environment          = "dev"

vpc_cidr             = "10.10.0.0/16"
public_subnets       = ["10.10.1.0/24","10.10.2.0/24"]
private_subnets      = ["10.10.11.0/24","10.10.12.0/24"]

eks_cluster_name     = "trippin-eks"
node_instance_type   = "t3.small"
desired_capacity     = 1
max_capacity         = 2

rds_allocated_storage = 20
rds_instance_class    = "db.t3.small"
db_name               = "trippindb"
db_username           = "trippin"
# db_password = "SECRET"   <- 절대 깃에 올리지 말 것. 대신 아래 실행법 참조.

ecr_repo_name         = "trippin-backend"
