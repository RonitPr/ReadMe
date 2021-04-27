package db

type Database struct {
	Name string
}

type ReadMeDatabase interface {
	GetUser(id ID) (User, error)
	GetUsers() ([]User, error)
	GetArticle(id ID) (Article, error)
	GetArticles() ([]Article, error)

	NewUser(user User) error
	NewArticle(article Article) error
	UpdateUser(user User) error
	UpdateArticle(article Article) error
}
